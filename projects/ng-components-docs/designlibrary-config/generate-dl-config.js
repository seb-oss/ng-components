const path = require("path");
const fs = require("fs");
const globby = require("globby");
const mustache = require("mustache");
const htmlFrontMatter = require("html-frontmatter");
const TypescriptParser = require("typescript-parser-es5").TypescriptParser;
const dlhelper = require("./design-library-helper");

// The purpose of this function is to find the component example modules from the demo site.
// It will then parse those files and extract the routes declaration. This will then be used to locate the HTML-files used in the example.
// In the next step, the HTML-files that contain a front-matter section will be converted to markdown files and saved to a directory.
// Lastly a content index json file will be created.
const generateDLFiles = async function () {
    const parser = new TypescriptParser();
    const exampleModuleFiles = await globby(path.join(__dirname, "../src/app/examples/components/**/*.module.ts"));

    let components = [];

    for (let i = 0; i < exampleModuleFiles.length; i++) {
        const moduleFilePath = exampleModuleFiles[i];
        const sourceFile = fs.readFileSync(moduleFilePath, "utf-8");
        const parsedModule = await parser.parseSource(sourceFile);
        const rd = parsedModule.declarations[0]; // routes declaration
        const routesArraySource = sourceFile
            .substr(rd.start, rd.end - rd.start)
            .replace(/.+= /, "")
            .replace(/component:.+,/gm, "")
            .replace(/require\('?"?!raw-loader!([.\/\-\_a-zA-Z]+)'?"?\)/gm, "'$1'");

        const routesArray = eval(routesArraySource);

        const examples = routesArray
            .filter(r => r.children !== undefined)
            .map(r => r.children)[0]
            .filter(r => r.path === "examples")[0]
            .children.map(r => ({
                route: r.path,
                dirname: path.dirname(moduleFilePath),
                title: r.data.title,
                description: r.data.description,
                htmlFile: r.data.sources.filter(s => s.lang === "markup")[0].src,
            }))
            .filter(r => r.htmlFile.indexOf(".html") > -1);

        components = components.concat(examples);
    }

    for (let i = 0; i < components.length; i++) {
        const component = components[i];
        const exampleFilesBasePath = path.join(component.dirname);
        const frontMatter = htmlFrontMatter(fs.readFileSync(path.join(exampleFilesBasePath, component.htmlFile), "utf-8"));
        const exampleFileMetadata = {
            ...frontMatter,
            ...component,
            iframesource: (frontMatter ? frontMatter.url : "") + "/" + component.route,
        };
        const renderedMarkdown = mustache.render(
            fs.readFileSync(path.join(__dirname, "dl-markdown-template.md"), "utf-8"),
            exampleFileMetadata
        );

        const targetDir = path.join(__dirname, "../../../dist/ng-components-docs/design-library");
        fs.mkdirSync(targetDir, { recursive: true });
        fs.writeFileSync(path.join(targetDir, (frontMatter ? frontMatter.componentid : "README") + ".md"), renderedMarkdown);
    }

    // After markdown files have been generated, we need to run this in order to generate an index file that can be read by Design Library.
    dlhelper.generateContentIndex({
        mdfiles_path: "dist/ng-components-docs/design-library", // Path to the directory to scan for md-files (relative from process.cwd())
        output_path: "dist/ng-components-docs/design-library/contentindex.json", // Full path to the output file
        rewrite_path: "/ng-components-docs/design-library", // This can be used to change the paths to Markdown files generated in the index file. Use this if the publicly accessible path is different from the path at buildtime. It simply does a string replace of the value in 'mdfiles_path' in the output.
    });
};

generateDLFiles();

/** Highlight js default langauges */
const defaultHljsLangs: Array<string> = [
    "scss",
    "properties", // This is a replacement for `bash` because it looks better
    "xml", // This is required for all `html` based languages and temlpates such as `handlebars`
    "handlebars", // This is used to render Angular templates with syntax highlighting
    "typescript", // This is required for examples of component .ts files
];

/** Loads highlight js and it's languages */
export function loadHighlightJs(): void {
    const highlightjs: typeof HLJS = require("highlight.js/lib/highlight") as any;

    /** Registers only the languages used in the application to optimize the bundle size */
    defaultHljsLangs.forEach((lang: string) => {
        try {
            highlightjs.registerLanguage(lang, require(`highlight.js/lib/languages/${lang}`));
        } catch (e) {
            console.error(e);
        }
    });

    window.hljs = highlightjs;
}

const globby = require('globby');
const fs = require('fs-extra');
const matter = require('gray-matter');

// Get a list of sub directories
const getDirs = p =>
  fs.readdirSync(p).filter(f => fs.statSync(p + '/' + f).isDirectory());

// Recursively scan for MD-files
const scanForMDFiles = function(dir) {
  let files = globby.sync([dir + '/*.md'], { cwd: process.cwd() });

  getDirs(dir).forEach(
    sub_dir => (files = files.concat(scanForMDFiles(dir + '/' + sub_dir)))
  );

  return files;
};

// parseFileMetadata: Parse each file and save the relevant metadata
const parseFileMetadata = function(filepath, config) {
  const filecontent = fs.readFileSync(filepath);

  if (config.rewrite_path) {
    filepath = filepath.replace(config.mdfiles_path, config.rewrite_path);
  }

  // Set basic metadata
  let filemetadata = {
    filename: filepath.substring(
      filepath.lastIndexOf('/') + 1,
      filepath.length
    ),
    filepath: filepath,
    shortpath: filepath.replace('.md', ''),
    longpath: filepath,
    type: 'file',
  };

  // Parse the md file using grey-matter (to get the document data structured)
  // https://www.npmjs.com/package/gray-matter
  const parsedFile = matter(filecontent);

  filemetadata.title = parsedFile.data.title;
  filemetadata.componentid = parsedFile.data.componentid;
  filemetadata.variantid = parsedFile.data.variantid || '';
  filemetadata.guid = parsedFile.data.guid;

  //Return the files metadata
  return filemetadata;
};

module.exports = {
  generateContentIndex: function(
    config = {
      mdfiles_path: 'mdfiles', // Where the files are on the filesystem at build-time
      rewrite_path: false, // Use this if you need to rewrite the public accessible path, where the files can be accessed on the server. Will replace mdfiles_path in the output.
      output_path: 'contentindex.json', // Where to output the index file
    }
  ) {
    let contentIndex = {
      structure: [],
    };

    let mdfiles = scanForMDFiles(config.mdfiles_path);
    mdfiles.forEach(file =>
      contentIndex.structure.push(parseFileMetadata(file, config))
    );

    fs.outputFileSync(
      config.output_path,
      JSON.stringify(contentIndex, null, '\t')
    );
  },
};

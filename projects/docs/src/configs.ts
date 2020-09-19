const pkg = require("../../../package.json");

export const urls: NavsURLs = {
    releases: "https://github.com/sebgroup/ng-components/releases",
    github: "https://github.com/sebgroup/ng-components/",
    contribute: "https://github.com/sebgroup/ng-components/blob/alpha/CONTRIBUTING.md",
    issues: "https://github.com/sebgroup/ng-components/issues",
};

export const getMetaTag: (keyword: string) => string = (keyword: string) => {
    return `A set of ng components based on SEB design library guidelines for mobile and web Angular applications - ${keyword}`;
};

export const metaConfigs: MetaConfig = {
    keywords: "SEB, Angular, ng component, angular component, typescript, mobile, web, ui, ux, open source, components",
    siteUrl: pkg.homepage,
    description: pkg.description,
    title: "SEB Angular Components",
    sitePreviewImageUrl: `${pkg.homepage}assets/images/site-preview.png`,
};

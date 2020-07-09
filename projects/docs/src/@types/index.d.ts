declare interface NavsURLs {
    releases: string;
    github: string;
    contribute: string;
    issues: string;
}

declare module "@pkg" {
    const data: NPMPackage;
    export default data;
}

declare interface NPMPackage {
    name: string;
    version: string;
    description: string;
    license: string;
    keywords: Array<string>;
    repository: {
        type: string;
        url: string;
    };
    bugs: {
        url: string;
    };
    homepage: string;
    dependencies: {
        [key: string]: string;
    };
    devDependencies: {
        [key: string]: string;
    };
}

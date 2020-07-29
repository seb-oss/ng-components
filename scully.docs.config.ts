import { ScullyConfig, setPluginConfig } from "@scullyio/scully";
import { baseHrefRewrite } from "@scullyio/scully-plugin-base-href-rewrite";

const pkg = require("./package.json");
const defaultPostRenderers = ["seoHrefOptimise", baseHrefRewrite];
setPluginConfig(baseHrefRewrite, { href: pkg.homepage });

export const config: ScullyConfig = {
    projectRoot: "./projects/docs/src",
    projectName: "docs",
    outDir: "./dist/docs",
    defaultPostRenderers,
    routes: {},
};

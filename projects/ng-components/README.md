# SEB Angular Components

![Deployment](https://github.com/sebgroup/ng-components/workflows/Deployment/badge.svg)
![npm](https://img.shields.io/npm/v/@sebgroup/ng-components?color=brightgreen)
![Github Pages](https://github.com/sebgroup/ng-components/workflows/Github%20Pages/badge.svg)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Coverage Status](https://coveralls.io/repos/github/sebgroup/ng-components/badge.svg?branch=master)](https://coveralls.io/github/sebgroup/ng-components?branch=master)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=sebgroup/ng-components)](https://dependabot.com)

This is a set of angular components some of which are based on SEB's bootstrap. The plan for this project is to increase and improve components for future usage.

-   The package name: `@sebgroup/ng-components`
-   The package documentation: [Documentation](https://sebgroup.github.io/ng-components)
-   The package sourcecode: [Github Source Code](https://github.com/sebgroup/ng-components)
-   NPM package: [@sebgroup/ng-components](https://www.npmjs.com/package/@sebgroup/ng-components)

## Minimum requirements

This version of components has been developed with:

-   Angular CLI `~10.0.1`
-   Typescript `~3.9.5`
-   SEB Bootstrap `^5.3.0`

## Installation

You should be able to install the NPM package.

```bash
npm install @sebgroup/ng-components --save
```

This project is based on SEB Bootstrap which includes `fonts`, `colors` and `variables`, to make sure everything works fine, please install these dependencies on your project:

```bash
npm install @sebgroup/bootstrap --save
```

Then make sure you add the Main SEB bootstrap package in your main style.SCSS or index.ts as follows
`@import '~@sebgroup/bootstrap/scss/bootstrap';`.

For `Visual Studio Code` users, please install the [recommended plugins](.vscode/extensions.json)

## Development

This project uses `prettier` for a more consistent (less annoying) coding.

1. Development: `npm start`
2. Check formatting rules, Compile components and Create Docs folder: `npm run build`
3. Build and create the Documentation pages only: `npm run docs`
4. To run the unit tests, run: `npm test`
5. To commit your changes run: `npm run commit` and follow the steps

## Usage

To use a component, you need to import the `Module` in whichever Module you want to use it. For performance/stability benefits we are not combining all the components into single Index, rather they are chunk into their own sub packages, therefore to use a component, you need to import the `Component` sub-module from the `lib` folder, in whichever Class you want to use it. Here is a sample of how to import the `Chip` component in a page which you can then access by its selector.

```javascript
import { ChipModule } from "@sebgroup/ng-components/lib/Chip";

@NgModule({
      imports: [ChipModule]
})
export class YourModule { }

 <sebng-chip (onClose)="onClose($event)">Chip Text</sebng-chip>
```

## Contact us

For your feedback please contact us via emails below:

1. yousif.alraheem@seb.se
2. mario.subotic@seb.se
3. nuru.salihuabdullahi@seb.se
4. omar.boudfoust@seb.se
5. kherphay.chang@seb.se

## For React Users

For all React users, we are hosting the same version of components [for React](https://github.com/sebgroup/react-components)

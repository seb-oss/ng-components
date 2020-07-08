# @sebgroup/ng-components

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Build Status](https://travis-ci.com/sebgroup/ng-components.svg?branch=alpha)](https://travis-ci.com/sebgroup/ng-components)
[![Stable Version](https://img.shields.io/npm/v/@sebgroup/ng-components/latest.svg)](https://www.npmjs.com/package/@sebgroup/ng-components)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.9.

## Demo

View demo [here](https://sebgroup.github.io/ng-components/components)

[![Build status](https://tfs.sebank.se/tfs/MSDE/Spartans/_apis/build/status/AngularComponents/AngularComponents-Build-Verify)](https://tfs.sebank.se/tfs/MSDE/Spartans/_build/latest?definitionId=5938)


This is a set of angular modules which are based on SEB's bootstrap theme.

## Minimum requirements
This version of components has been tested and developed on, due to angular dependencies upgrades and their backward compatibility issues, the min requirements to run the current version of the app has changed and will constantly changing.
-   Angular `8.0.0` or above


## Installation
As long as you are connected to SEB network. You should be able to install the NPM package.
```bash
npm install @sebgroup/ng-components --save
```

This project is based on SEB Bootstrap which includes `fonts`, `colors` and `variables`, to make sure everything works fine, please install these dependencies on your project:
```bash
npm install @sebgroup/bootstrap --save
```

Then make sure you add the Main SEB bootstrap package in your main style.SCSS or index.ts as follows
`@import '~@sebgroup/bootstrap/scss/bootstrap';`.


## Development
For `Visual Studio Code` users, please install the recommended project plugin

1. To run the project for development: `npm run docs`
4. To run the unit tests, run: `npm run test`

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
2. nuru.salihuabdullahi@seb.se
3. omar.boudfoust@seb.se
4. mario.subotic@seb.se
5. kherphay.chang@seb.se
6. robert.hjalmers@seb.se

## For React Users
For all React users, we are hosting the same version of components [for react](https://github.com/sebgroup/react-components)

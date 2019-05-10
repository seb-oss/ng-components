import {Injector} from '@angular/core';

export class SebModalInjector implements Injector {

  constructor(private injector: Injector, private tokens: WeakMap<any, any>) { }

  get(token: any, notFoundValue?: any): any {
    const value = this.tokens.get(token);
    if (typeof value !== 'undefined') { return value; }
    return this.injector.get<any>(token, notFoundValue);
  }
}

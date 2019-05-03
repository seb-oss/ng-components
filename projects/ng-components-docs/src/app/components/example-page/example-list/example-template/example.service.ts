import { Injectable } from '@angular/core';
import { ExampleStore } from './example.store';

@Injectable({ providedIn: 'root' })
export class ExampleService {

  constructor(private exampleStore: ExampleStore) {
  }

  setFullscreen(isFullscreen: boolean) {
    this.exampleStore.update(_ => ({
      isFullscreen
    }));
  }

}

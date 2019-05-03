import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface ExampleState {
   isFullscreen: boolean;
}

export function createInitialState(): ExampleState {
  return {
    isFullscreen: false
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'example' })
export class ExampleStore extends Store<ExampleState> {

  constructor() {
    super(createInitialState());
  }

}


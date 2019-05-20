import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ExampleStore, ExampleState } from './example.store';

@Injectable({ providedIn: 'root' })
export class ExampleQuery extends Query<ExampleState> {

  $isFullscreen = this.select('isFullscreen');

  constructor(protected store: ExampleStore) {
    super(store);
  }

}

import {Location} from '@angular/common';
import {SebModalConfig} from './modal.config';
import {EventEmitter} from '@angular/core';
import {Subscription, SubscriptionLike} from 'rxjs';

export class SebModalRef<T = any> {

  public onClose$: EventEmitter<any> = new EventEmitter<any>();
  private _locationChanges: SubscriptionLike = Subscription.EMPTY;

  constructor(
    private location: Location,
    public config: SebModalConfig) {

    if (this.config && this.config.closeOnNavigationChanges) {
      this._locationChanges = this.location
        .subscribe(() => this.close())
    }
  }

  public close(): void {
    this._destroy();
  }

  public dismiss(reason?:any) {
    this._destroy(reason);
  }

  private _destroy(reason?:any) {
    this._locationChanges.unsubscribe();
    this.onClose$.next(reason);
  }
}

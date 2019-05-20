import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'lib-doc-parse',
  template: `
  `,
  styles: []
})
export class ParseSourceExampleComponent implements OnInit {

  /**
   * Some description for the date input, like format should be ex. `YYYYMMDD`.
   * Use it to display date in a specific format inside the component.
   */
  @Input() set date(value: number) {
    this._date = value;
  }

  get date(): number {
    return this._date;
  }

  @Input() get time(): string {
    return this._time;
  }
  set time(value: string) {
    this._time = value;
  }
  /**
   * Food for the component ex. `banana` <a href="https://www.google.se/search?q=banana" target="_blank">show banana</a>
   */
  @Input() get food(): any {
    return this._food;
  }
  set food(value: any) {
    this._food = value;
  }
  /**
   * Lorem ipsum dolar sit event
   */
  @Output() event: EventEmitter<any> = new EventEmitter();
  someValue: string = 'hello';
  $anotherValue: Observable<boolean>;
  private _time: string = 'time';
  private _food: any = 'burger';
  private _date: number;
  constructor() { }

  /**
   * Foo bar function for demo purposes
   */
  foo(bar: string, hoo?: number): boolean {
    return !!bar;
  }

  ngOnInit() {
  }

}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'lib-doc-parse',
  template: `
  `,
  styles: []
})
export class ParseSourceExampleComponent implements OnInit {

  /**
   * Create an instance of `CustomClass` with the given `options`.
   *
   * @param {Number} value - date number
   * @api public
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

  @Output() event: EventEmitter<boolean> = new EventEmitter();
  someValue: string = 'hello';
  private _time: string = 'time';
  private _date: number;
  constructor() { }

  foo(bar: string, hoo?: number): boolean {
    return !!bar;
  }

  ngOnInit() {
  }

}

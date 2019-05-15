import { Component, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnChanges {
  title = 'ng-components';
  style: string;
  size: number = 10;

  border  = {
    color: '#F03529 #e9e9e9 #e9e9e9',
    style: this.style,
    radius: '50%',
    width: this.setSize(),
    height: this.setSize()
  };

  innerLoaderBorder = {
    color: '',
    style: 'double',
    radius: '50%',
    width: '5px'
  };

  innerLoader = false;

  ngOnChanges(changes: SimpleChanges) {
    if (this.size) {
      this.setSize();
    }
  }

  loadMe(): void {
    this.innerLoader = true;
    setTimeout(() => {
      this.innerLoader = false;
    }, 3000);
  }

  setSize(): string {
    return this.size + 'px';
  }


}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleComponentComponent } from './example-component.component';

describe('ExampleComponentComponent', () => {
  let component: ExampleComponentComponent;
  let fixture: ComponentFixture<ExampleComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

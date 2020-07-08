import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DocsWrapperComponent } from "./docs-wrapper.component";

describe("DocsWrapperComponent", () => {
  let component: DocsWrapperComponent;
  let fixture: ComponentFixture<DocsWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocsWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

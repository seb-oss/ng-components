import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TechStackComponent } from "./tech-stack.component";

describe("TechStackComponent", () => {
  let component: TechStackComponent;
  let fixture: ComponentFixture<TechStackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechStackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

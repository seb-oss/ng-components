import { TestBed } from "@angular/core/testing";

import { NgComponentsService } from "./ng-components.service";

describe("NgComponentsService", () => {
  let service: NgComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgComponentsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});

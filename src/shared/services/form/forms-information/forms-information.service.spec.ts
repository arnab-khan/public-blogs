import { TestBed } from '@angular/core/testing';

import { FormsInformationService } from './forms-information.service';

describe('FormsInformationService', () => {
  let service: FormsInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormsInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

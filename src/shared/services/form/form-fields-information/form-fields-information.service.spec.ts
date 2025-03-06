import { TestBed } from '@angular/core/testing';

import { FormFieldsInformationService } from './form-fields-information.service';

describe('FormFieldsInformationService', () => {
  let service: FormFieldsInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormFieldsInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { inject, Injectable } from '@angular/core';
import { FormFieldsInformationService } from '../form-fields-information/form-fields-information.service';
import { FormsInformation } from '../../../../interfaces/forms-information';

@Injectable({
  providedIn: 'root'
})
export class FormsInformationService {

  private formFieldsInformationService = inject(FormFieldsInformationService);

  forms: FormsInformation = {
    login: () => {
      return {
        formFields: [
          {
            information: this.formFieldsInformationService.fields['userName'],
            sequence: 1,
          },
          {
            information: this.formFieldsInformationService.fields['password'],
            sequence: 2,
          }
        ],
      }
    },
    signUp: () => {
      return {
        formFields: [
          {
            information: this.formFieldsInformationService.fields['name'],
            sequence: 1,
          },
          {
            information: this.formFieldsInformationService.fields['userName'],
            sequence: 2,
          },
          {
            information: this.formFieldsInformationService.fields['password'],
            sequence: 3,
          }
        ]
      }
    }
  }
}

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
        submitButton: {
          label: 'Login',
          classes: 'btn btn-primary',
        },
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
        submitButton: {
          label: 'Sign Up',
          classes: 'btn btn-primary',
        },
        formFields: [
          {
            information: this.formFieldsInformationService.fields['name'],
            sequence: 1,
          },
          {
            information: this.formFieldsInformationService.fields['checkUserName'],
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

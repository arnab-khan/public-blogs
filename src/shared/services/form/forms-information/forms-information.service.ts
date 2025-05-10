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
            information: this.formFieldsInformationService.fields['profilePicture'],
            sequence: 1,
          },
          {
            information: this.formFieldsInformationService.fields['name'],
            sequence: 2,
          },
          {
            information: this.formFieldsInformationService.fields['checkUserName'],
            sequence: 3,
          },
          {
            information: this.formFieldsInformationService.fields['createPassword'],
            sequence: 4,
          }
        ]
      }
    },
    post: () => {
      return {
        submitButton: {
          label: 'Create Post',
          classes: 'btn btn-primary',
        },
        formFields: [
          {
            information: this.formFieldsInformationService.fields['title'],
            sequence: 1,
          },
          {
            information: this.formFieldsInformationService.fields['content'],
            sequence: 2,
          }
        ]
      }
    }
  }
}

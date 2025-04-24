import { Injectable } from '@angular/core';
import { FieldInformation } from '../../../../interfaces/forms-information';

@Injectable({
  providedIn: 'root'
})
export class FormFieldsInformationService {

  constructor() { }

  fields:{[x:string]:FieldInformation} = {
    name: {
      controlName: 'name',
      fieldType: 'text',
      type: 'text',
      label: 'Name',
      placeholder: 'Enter your name',
      validation: [
        { type: 'required', value: true, message: 'Name is required' },
        { type: 'maxlength', value: 30, message: 'Name should not exceed 30 characters' },
        { type: 'pattern', value: /^[a-zA-Z\s]+$/, message: 'Name should contain only alphabets and space' }
      ]
    },
    userName: {
      controlName: 'userName',
      fieldType: 'text',
      type: 'text',
      label: 'User Name',
      placeholder: 'Enter your user name',
      validation: [
        { type: 'required', value: true, message: 'User Name is required' },
        { type: 'maxlength', value: 30, message: 'User Name should not exceed 30 characters' },
        { type: 'pattern', value: /^[a-zA-Z0-9]+$/, message: 'User Name should contain only alphabets and numbers' },
      ]
    },
    checkUserName: {
      controlName: 'checkUserName',
      fieldType: 'checkUserName',
      type: 'text',
      label: 'User Name',
      placeholder: 'Enter your user name',
      validation: [
        { type: 'required', value: true, message: 'User Name is required' },
        { type: 'maxlength', value: 30, message: 'User Name should not exceed 30 characters' },
        { type: 'pattern', value: /^[a-zA-Z0-9]+$/, message: 'User Name should contain only alphabets and numbers' },
        { type: 'userNameExists', value: true, message: null }
      ]
    },
    password: {
      controlName: 'password',
      fieldType: 'text',
      type: 'password',
      label: 'Password',
      placeholder: 'Enter your password',
      validation: [
        { type: 'required', value: true, message: 'Password is required' },
        { type: 'minlength', value: 6, message: 'Password should be atleast 6 characters long' },
        { type: 'maxlength', value: 30, message: 'Password should not exceed 20 characters' },
        { type: 'pattern', value: /^[a-zA-Z0-9]+$/, message: 'User Name should contain only alphabets and numbers' }
      ]
    }
  }
}

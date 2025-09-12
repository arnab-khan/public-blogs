import { Injectable } from '@angular/core';
import { FieldInformation } from '../../../../interfaces/forms-information';

@Injectable({
  providedIn: 'root'
})
export class FormFieldsInformationService {

  constructor() { }

  fields: { [x: string]: FieldInformation } = {
    profilePicture: {
      controlName: 'profilePicture',
      fieldType: 'profilePicture',
      type: 'file',
      label: 'Profile Picture',
      placeholder: 'Upload your profile picture',
      validation: [
        // { type: 'required', value: true, message: 'Profile Picture is required' },
        { type: 'fileType', value: ['image/jpeg', 'image/png'], message: 'Profile Picture should be in JPEG or PNG format' },
        { type: 'fileSize', value: 1024 * 1024, message: 'Profile Picture should be less than 1MB' },
      ]
    },
    name: {
      controlName: 'name',
      fieldType: 'text',
      type: 'text',
      label: 'Name',
      placeholder: 'Enter your name',
      validation: [
        { type: 'required', value: true, message: 'Name is required' },
        { type: 'maxlength', value: 30, message: 'Name should not exceed 30 characters' },
        { type: 'pattern', value: /^[a-zA-Z\s]+$/, message: 'Name should contain only alphabets and space' },
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
        { type: 'minlength', value: 3, message: 'User Name should be at least 3 characters long' },
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
        { type: 'minlength', value: 3, message: 'User Name should be at least 3 characters long' },
        { type: 'pattern', value: /^[a-zA-Z0-9]+$/, message: 'User Name should contain only alphabets and numbers' },
        { type: 'userNameExists', value: true, message: null },
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
      ]
    },
    createPassword: {
      controlName: 'password',
      fieldType: 'text',
      type: 'password',
      label: 'Password',
      placeholder: 'Enter your password',
      validation: [
        { type: 'required', value: true, message: 'Password is required' },
        { type: 'minlength', value: 6, message: 'Password should be at least 6 characters long' },
        { type: 'maxlength', value: 20, message: 'Password should not exceed 20 characters' },
        { type: 'pattern', value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, message: 'Password must contain at least one letter, one number, and no spaces' },
      ]
    },
    newPassword: {
      controlName: 'newPassword',
      fieldType: 'text',
      type: 'password',
      label: 'New Password',
      placeholder: 'Enter new password',
      validation: [
        { type: 'required', value: true, message: 'New password is required' },
        { type: 'minlength', value: 6, message: 'Password should be at least 6 characters long' },
        { type: 'maxlength', value: 20, message: 'Password should not exceed 20 characters' },
        { type: 'pattern', value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, message: 'Password must contain at least one letter, one number, and no spaces' },
      ]
    },
    title: {
      controlName: 'title',
      fieldType: 'text',
      type: 'text',
      label: 'Title',
      placeholder: 'Enter the title',
      validation: [
        { type: 'required', value: true, message: 'Title is required' },
        { type: 'maxlength', value: 100, message: 'Title should not exceed 100 characters' },
      ]
    },
    content: {
      controlName: 'content',
      fieldType: 'textarea',
      type: 'textarea',
      label: 'Content',
      placeholder: 'Enter the content',
      validation: [
        { type: 'required', value: true, message: 'Content is required' },
        { type: 'maxlength', value: 1000, message: 'Content should not exceed 1000 characters' },
      ]
    }
  }
}

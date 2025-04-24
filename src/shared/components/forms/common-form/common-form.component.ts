import { Component, EventEmitter, inject, Input, OnChanges, Output, output, SimpleChanges } from '@angular/core';
import { FormFields, FormInformation, SubmitButton } from '../../../../interfaces/forms-information';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/apis/auth/auth.service';
import { BehaviorSubject, debounceTime } from 'rxjs';
import { CheckUsername } from '../../../../interfaces/auth';

@Component({
  selector: 'app-common-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './common-form.component.html',
  styleUrl: './common-form.component.scss'
})
export class CommonFormComponent implements OnChanges {
  @Input() formInformation: FormInformation | undefined;
  @Output() submitForm = new EventEmitter<any>();

  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);


  formGroup: FormGroup | undefined;
  formFields: FormFields[] = [];
  formButton: SubmitButton | undefined;

  inputUserNameObserable = new BehaviorSubject<string>('');
  inputUserNameAvailability: CheckUsername | undefined;

  submituttonLoader=false;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('formInformation', this.formInformation);
    if (changes['formInformation'] && this.formInformation) {
      this.formButton = this.formInformation?.submitButton;
      this.formFields = this.formInformation?.formFields || [];
      this.createForm();
    }
  }

  createForm() {
    const controlls = this.formFields?.reduce((addedControlls, formField) => {
      const fieldInformation = formField.information;
      const validation = fieldInformation.validation?.map(validation => {
        let currentValidetion;
        switch (validation.type) {
          case 'required':
            currentValidetion = Validators.required;
            break;
          case 'maxlength':
            currentValidetion = Validators.maxLength(validation.value);
            break
          case 'pattern':
            currentValidetion = Validators.pattern(validation.value);
            break
          case 'userNameExists':
            currentValidetion = this.userNameExistsValidator;
            break
          default:
            break;
        }
        return currentValidetion;
      }).filter(element => element);
      console.log('validation', validation);

      const controll = {
        [fieldInformation.controlName]: ['', Validators.compose(validation || [])]
      }
      return { ...addedControlls, ...controll };
    }, {}) || {};
    this.formGroup = this.formBuilder.group(controlls);
    console.log('formGroup value', this.formGroup.value);
    this.checkIfUserNameExists();
  }

  // ========== start custom validetion ==========
  userNameExistsValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const value: string | undefined = control.value;
    if (!this.inputUserNameAvailability?.available && value?.length) {
      return { userNameExists: true };
    }
    return null;
  }

  // ========== end custom validetion ==========

  submit() {
    console.log('formGroup value', this.formGroup?.value);
    if (this.formGroup?.status=='VALID') {
      this.submitForm.emit(this.formGroup?.value);
    } else {
      
    }
  }

  getFieldControl(controlName: string): FormControl {
    return this.formGroup?.get(controlName) as FormControl;
  }

  // ========== start apis call ==========
  inputUserName(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.inputUserNameObserable.next(inputValue);

  }
  checkIfUserNameExists() {
    const fieldControll = this.getFieldControl('checkUserName');
    this.inputUserNameObserable.pipe(
      debounceTime(500)
    ).subscribe({
      next: (userName) => {
        if (userName) {
          this.authService.checkIfUserExists(userName).subscribe({
            next: (response) => {
              console.log('response', response);
              this.inputUserNameAvailability = response;
              fieldControll.updateValueAndValidity();
            },
            error: (error) => {
              console.log('error', error);
            }
          });
        }
      }
    })
  }
  // ========== end apis call ==========
}

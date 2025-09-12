import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ControllValue, FormFields, FormInformation, SubmitButton } from '../../../../interfaces/forms-information';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/apis/auth/auth.service';
import { BehaviorSubject, debounceTime } from 'rxjs';
import { CheckUsername } from '../../../../interfaces/auth';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ImageUploaderDialogComponent } from '../../dialogs/image-uploader-dialog/image-uploader-dialog.component';


@Component({
  selector: 'app-common-form',
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, MatProgressSpinnerModule],
  templateUrl: './common-form.component.html',
  styleUrl: './common-form.component.scss'
})
export class CommonFormComponent implements OnChanges {
  @Input() formInformation: FormInformation | undefined;
  @Input() controllValues: ControllValue = {};
  @Input() submituttonLoader = false;
  @Output() submitForm = new EventEmitter<any>();

  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private dialog = inject(MatDialog);

  formGroup: FormGroup | undefined;
  formFields: FormFields[] = [];
  formButton: SubmitButton | undefined;

  inputUserNameObserable = new BehaviorSubject<string>('');
  inputUserNameAvailability: CheckUsername | undefined;
  isCheckingUsername = false;
  clickedSubmitButton = false;
  pencilIcon = faPencil;
  userIcon = faUser;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('formInformation', this.formInformation);
    if (changes['formInformation'] && this.formInformation) {
      this.formButton = this.formInformation?.submitButton;
      this.formFields = this.formInformation?.formFields || [];
      this.createForm();
    }
    if (changes['controllValues']) {
      this.patchControllValue();
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
          case 'minlength':
            currentValidetion = Validators.minLength(validation.value);
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
    this.patchControllValue();
  }

  patchControllValue() {
    if (this.formGroup && Object.keys(this.controllValues).length) {
      for (const controllName in this.controllValues) {
        const controll = this.getFieldControl(controllName);
        if (controll) {
          const controllValue = this.controllValues[controllName];
          controll.patchValue(controllValue);
        }
      }
    }
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
    this.clickedSubmitButton = true;
    if (this.formGroup?.status == 'VALID' && !this.isCheckingUsername) {
      this.submituttonLoader = true;
      this.submitForm.emit(this.formGroup?.value);
    }
  }

  getFieldControl(controlName: string): FormControl {
    return this.formGroup?.get(controlName) as FormControl;
  }

  // ========== start image uploader ==========
  openImageUploaderDialog(imageChangedEvent: Event, fieldControl: FormControl) {
    this.dialog.open(ImageUploaderDialogComponent, {
      width: '50rem',
      maxWidth: '90vw',
      data: {
        imageChangedEvent: imageChangedEvent,
      }
    }).afterClosed().subscribe((result) => {
      if (result) {
        const compressedImage = result.image;
        fieldControl.setValue(compressedImage);
      }
    });
  }
  // ========== end image uploader ==========

  // ========== start apis call ==========
  inputUserName(event: Event): void {
    this.isCheckingUsername = true;
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
              this.isCheckingUsername = false;
            },
            error: (error) => {
              console.log('error', error);
              this.isCheckingUsername = false;
            }
          });
        } else {
          this.isCheckingUsername = false;
        }
      }
    })
  }
  // ========== end apis call ==========
}

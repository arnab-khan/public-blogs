import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormFields, FormInformation } from '../../../../interfaces/forms-information';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-common-form',
  imports: [ReactiveFormsModule],
  templateUrl: './common-form.component.html',
  styleUrl: './common-form.component.scss'
})
export class CommonFormComponent implements OnChanges {
  @Input() formInformation: FormInformation | undefined;

  formGroup: FormGroup | undefined;
  private formBuilder = inject(FormBuilder);
  formFields: FormFields[]=[];

  ngOnChanges(changes: SimpleChanges): void {
    console.log('formInformation', this.formInformation);
    if (changes['formInformation']&&this.formInformation) {
      this.formFields = this.formInformation?.formFields||[];
      this.createForm();
    }
  }

  createForm() {
    const controlls = this.formFields?.reduce((addedControlls,formField) => {
      const fieldInformation = formField.information;
      const controll= {
        [fieldInformation.controllName]: ['']
      }
      return {...addedControlls, ...controll};
    },{}) || {};
    this.formGroup = this.formBuilder.group(controlls);
    console.log('formGroup value', this.formGroup.value);
  }

  submit(){
    console.log('formGroup value', this.formGroup?.value);
  }
}

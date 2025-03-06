import { Component, inject } from '@angular/core';
import { FormsInformationService } from '../../../services/form/forms-information/forms-information.service';
import { CommonFormComponent } from "../common-form/common-form.component";

@Component({
  selector: 'app-sign-up',
  imports: [CommonFormComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  private formsInformationService = inject(FormsInformationService);
  formInformation = this.formsInformationService.forms.signUp();
  
}

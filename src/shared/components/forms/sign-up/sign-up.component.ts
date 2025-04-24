import { Component, inject } from '@angular/core';
import { FormsInformationService } from '../../../services/form/forms-information/forms-information.service';
import { CommonFormComponent } from "../common-form/common-form.component";
import { CreateUser } from '../../../../interfaces/auth';
import { AuthService } from '../../../services/apis/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  imports: [CommonFormComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  private formsInformationService = inject(FormsInformationService);
  private authService = inject(AuthService);

  formInformation = this.formsInformationService.forms.signUp();

  createUser(event: { name: string; checkUserName: string; password: string; }) {
    const body: CreateUser = {
      name: event.name,
      userName: event.checkUserName,
      password: event.password
    }
    this.authService.createUser(body).subscribe({
      next: (response) => {
        console.log('response', response);

      },
      error: (error) => {
        console.log('error', error);
      }
    })
  }
}

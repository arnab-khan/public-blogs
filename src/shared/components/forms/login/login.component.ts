import { Component, inject } from '@angular/core';
import { LoginUser } from '../../../../interfaces/auth';
import { AuthService } from '../../../services/apis/auth/auth.service';
import { FormsInformationService } from '../../../services/form/forms-information/forms-information.service';
import { CommonFormComponent } from '../common-form/common-form.component';
import { saveLocalStorage } from '../../../utils/local-storage';

@Component({
  selector: 'app-login',
  imports: [CommonFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private formsInformationService = inject(FormsInformationService);
  private authService = inject(AuthService);

  formInformation = this.formsInformationService.forms.login();

  loginUser(event: { name: string; userName: string; password: string; }) {
    const body: LoginUser = {
      userName: event.userName,
      password: event.password
    }
    this.authService.loginUser(body).subscribe({
      next: (response) => {
        console.log('response', response);
        saveLocalStorage('token', response.token);
      },
      error: (error) => {
        console.log('error', error);
      }
    })
  }
}

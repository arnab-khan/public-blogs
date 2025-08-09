import { Component, inject, output } from '@angular/core';
import { AuthService } from '../../../services/apis/auth/auth.service';
import { FormsInformationService } from '../../../services/form/forms-information/forms-information.service';
import { CommonFormComponent } from '../../forms/common-form/common-form.component';

@Component({
  selector: 'app-change-password',
  imports: [CommonFormComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  private formsInformationService = inject(FormsInformationService);
  private authService = inject(AuthService);

  formInformation = this.formsInformationService.forms.changePasssword();
  passwordChanged = output<any>();

  changePassword(event: { password: string; newPassword: string }) {
    const body = {
      currentPassword: event.password,
      newPassword: event.newPassword
    };
    
    this.authService.changePassword(body).subscribe({
      next: (response) => {
        this.passwordChanged.emit(response);
      },
      error: (error) => {
        console.log('error', error);
      }
    });
  }
}
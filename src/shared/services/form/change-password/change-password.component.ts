import { Component, inject, output } from '@angular/core';
import { AuthService } from '../../apis/auth/auth.service';
import { FormsInformationService } from '../forms-information/forms-information.service';
import { CommonFormComponent } from '../../../components/forms/common-form/common-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  imports: [CommonFormComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  private formsInformationService = inject(FormsInformationService);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  formInformation = this.formsInformationService.forms.changePasssword();
  passwordChanged = output<any>();

  changePassword(event: { password: string; newPassword: string }) {
    const body = {
      currentPassword: event.password,
      newPassword: event.newPassword
    };
    
    this.authService.changePassword(body).subscribe({
      next: (response) => {
        this.snackBar.open('Password changed successfully!', 'Close', {
          duration: 5000
        });
        this.passwordChanged.emit(response);
      },
      error: (error) => {
        this.snackBar.open(error?.error?.error, 'Close', {
          duration: 5000
        });
      }
    });
  }
}
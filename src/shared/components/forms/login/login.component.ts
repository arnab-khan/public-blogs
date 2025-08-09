import { Component, inject } from '@angular/core';
import { LoginUser } from '../../../../interfaces/auth';
import { AuthService } from '../../../services/apis/auth/auth.service';
import { FormsInformationService } from '../../../services/form/forms-information/forms-information.service';
import { CommonFormComponent } from '../common-form/common-form.component';
import { Store } from '@ngrx/store';
import { saveUser } from '../../../ngrx/ngrx.action';
import { saveToken } from '../../../utils/local-storage';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [CommonFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private formsInformationService = inject(FormsInformationService);
  private authService = inject(AuthService);
  private store = inject(Store);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  formInformation = this.formsInformationService.forms.login();

  loginUser(event: { name: string; userName: string; password: string; }) {
    const body: LoginUser = {
      userName: event.userName,
      password: event.password
    }
    this.authService.loginUser(body).subscribe({
      next: (response) => {
        // console.log('response', response);
        saveToken(response.token);
        this.store.dispatch(saveUser(response.user));
        this.router.navigateByUrl('/');
      },
      error: (error) => {        
        this.snackBar.open(error?.error?.error, 'Close', {
          duration: 5000
        });
      }
    })
  }
}

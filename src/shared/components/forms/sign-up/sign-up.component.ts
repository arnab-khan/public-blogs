import { Component, inject } from '@angular/core';
import { FormsInformationService } from '../../../services/form/forms-information/forms-information.service';
import { CommonFormComponent } from "../common-form/common-form.component";
import { CreateUser } from '../../../../interfaces/auth';
import { AuthService } from '../../../services/apis/auth/auth.service';
import { saveToken } from '../../../utils/local-storage';
import { Store } from '@ngrx/store';
import { saveUser } from '../../../ngrx/ngrx.action';

@Component({
  selector: 'app-sign-up',
  imports: [CommonFormComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  private formsInformationService = inject(FormsInformationService);
  private authService = inject(AuthService);
  private store = inject(Store);

  formInformation = this.formsInformationService.forms.signUp();

  createUser(event: { name: string; checkUserName: string; password: string; profilePicture: string; }) {
    const body: CreateUser = {
      name: event.name,
      userName: event.checkUserName,
      password: event.password,
      profilePicture: event?.profilePicture,
    }
    this.authService.createUser(body).subscribe({
      next: (response) => {
        console.log('response', response);
        saveToken(response.token);
        this.store.dispatch(saveUser(response.user));
      },
      error: (error) => {
        console.log('error', error);
      }
    })
  }
}

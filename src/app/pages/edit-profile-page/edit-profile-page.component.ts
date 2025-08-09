import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { CreateUser, LoginUser, User } from '../../../interfaces/auth';
import { saveUser } from '../../../shared/ngrx/ngrx.action';
import { AuthService } from '../../../shared/services/apis/auth/auth.service';
import { FormsInformationService } from '../../../shared/services/form/forms-information/forms-information.service';
import { saveToken } from '../../../shared/utils/local-storage';
import { CommonFormComponent } from '../../../shared/components/forms/common-form/common-form.component';
import { userSelector } from '../../../shared/ngrx/ngrx.selector';
import { ControllValue } from '../../../interfaces/forms-information';
import { ChangePasswordDialogComponent } from '../../../shared/components/dialogs/change-password-dialog/change-password-dialog.component';

@Component({
  selector: 'app-edit-profile-page',
  imports: [CommonFormComponent],
  templateUrl: './edit-profile-page.component.html',
  styleUrl: './edit-profile-page.component.scss'
})
export class EditProfilePageComponent implements OnInit {

  ngOnInit(): void {
    this.getUser();
  }

  private formsInformationService = inject(FormsInformationService);
  private authService = inject(AuthService);
  private store = inject(Store);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  formInformation = this.formsInformationService.forms.editProfile();
  user: User | undefined;
  controllValues: ControllValue = {};

  getUser() {
    this.store.select(userSelector).subscribe({
      next: (response) => {
        this.user = response;
        // console.log('user', this.user);
        this.controllValues = {
          profilePicture: this.user?.profilePicture || '',
          name: this.user?.name || '',
          userName: this.user?.userName || ''
        }
      }
    })
  }

  saveProfile(event: { name: string; userName: string; password: string; profilePicture?: string }) {
    const body: CreateUser = {
      name: event.name,
      userName: event.userName,
      password: event.password,
      profilePicture: event.profilePicture,
    }
    this.authService.editProfile(body).subscribe({
      next: (response) => {
        // console.log('response', response);
        saveToken(response.token);
        this.store.dispatch(saveUser(response.user));
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        console.log('error', error);
      }
    })
  }

  openChangePasswordDialog() {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Password changed successfully');
      }
    });
  }
}

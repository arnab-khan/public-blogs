import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../../auths/change-password/change-password.component';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-change-password-dialog',
  imports: [ChangePasswordComponent, FontAwesomeModule],
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.scss'
})
export class ChangePasswordDialogComponent {
  private dialogRef = inject(MatDialogRef<ChangePasswordDialogComponent>);

  closeIcon = faTimes;

  onPasswordChanged(response: any) {
    this.dialogRef.close(response);
  }
}

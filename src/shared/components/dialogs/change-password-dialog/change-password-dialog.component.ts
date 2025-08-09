import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../../../services/form/change-password/change-password.component';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-change-password-dialog',
  imports: [ChangePasswordComponent, FontAwesomeModule, MatDialogModule],
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

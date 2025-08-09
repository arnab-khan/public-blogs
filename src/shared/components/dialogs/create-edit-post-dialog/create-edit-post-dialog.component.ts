import { Component, inject, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CreateEditPostComponent } from '../../forms/create-edit-post/create-edit-post.component';
import { Post } from '../../../../interfaces/post';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-edit-post-dialog',
  imports: [CreateEditPostComponent, FontAwesomeModule, MatDialogModule],
  templateUrl: './create-edit-post-dialog.component.html',
  styleUrl: './create-edit-post-dialog.component.scss'
})
export class CreateEditPostDialogComponent {
  private dialogRef = inject(MatDialogRef<CreateEditPostDialogComponent>);

  closeIcon = faTimes;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { blog?: Post }
  ) { }

  onBlogCreated(response: any) {
    this.dialogRef.close(response);
  }
}

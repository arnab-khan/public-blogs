import { Component, inject, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateEditPostComponent } from '../../forms/create-edit-post/create-edit-post.component';
import { Post } from '../../../../interfaces/post';

@Component({
  selector: 'app-create-edit-post-dialog',
  imports: [CreateEditPostComponent],
  templateUrl: './create-edit-post-dialog.component.html',
  styleUrl: './create-edit-post-dialog.component.scss'
})
export class CreateEditPostDialogComponent {
  private dialogRef = inject(MatDialogRef<CreateEditPostDialogComponent>);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { blog?: Post }
  ) { }

  onBlogCreated(response: any) {
    this.dialogRef.close(response);
  }
}

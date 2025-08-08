import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateEditPostComponent } from '../../forms/create-edit-post/create-edit-post.component';

@Component({
  selector: 'app-create-edit-post-dialog',
  imports: [CreateEditPostComponent],
  templateUrl: './create-edit-post-dialog.component.html',
  styleUrl: './create-edit-post-dialog.component.scss'
})
export class CreateEditPostDialogComponent {
  private dialogRef = inject(MatDialogRef<CreateEditPostDialogComponent>);

  onBlogCreated(response: any) {
    this.dialogRef.close(response);
  }
}

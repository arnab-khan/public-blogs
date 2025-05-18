import { Component, Inject, inject } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../../../services/apis/blog/blog.service';
import { Comment, Post } from '../../../../interfaces/post';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../../blogs/profile/profile.component';

@Component({
  selector: 'app-post-comments-dialog',
  imports: [CommonModule, MatDialogModule, FontAwesomeModule, FormsModule, ProfileComponent],
  templateUrl: './post-comments-dialog.component.html',
  styleUrl: './post-comments-dialog.component.scss'
})
export class PostCommentsDialogComponent {
  private blogService = inject(BlogService);

  closeIcon = faTimes;
  post: Post | undefined;
  postId: string | undefined;
  inputComment: string = '';
  comments: Comment[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { post: Post }
  ) { }

  ngOnInit(): void {
    this.post = this.data.post;
    this.postId = this.post?._id;
    this.getComments();
  }

  addComment() {
    if (this.postId) {
      this.blogService.addComment(this.postId, this.inputComment).subscribe({
        next: (response) => {
          console.log('comment', response);
          this.inputComment = '';
          this.getComments();
        },
        error: (error) => {
          console.error('error', error);
        }
      })
    }
  }

  getComments() {
    if (this.postId) {
      this.blogService.getBlogComments(this.postId).subscribe({
        next: (response) => {
          console.log('comments', response);
          this.comments = response.reverse(); // reverse to show latest comments first
        },
        error: (error) => {
          console.error('error', error);
        }
      })
    }
  }
}

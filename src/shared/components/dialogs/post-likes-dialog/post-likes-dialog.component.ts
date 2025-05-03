import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { LikeResponse, Post } from '../../../../interfaces/post';
import { BlogService } from '../../../services/apis/blog/blog.service';
import { CommonModule } from '@angular/common';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-post-likes-dialog',
  imports: [CommonModule,MatDialogModule, FontAwesomeModule],
  templateUrl: './post-likes-dialog.component.html',
  styleUrl: './post-likes-dialog.component.scss'
})
export class PostLikesDialogComponent implements OnInit {
  private blogService = inject(BlogService);
  post: Post | undefined;
  postId: string | undefined;
  likes: LikeResponse[] = [];
  closeIcon = faTimes;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { post: Post }
  ) { }

  ngOnInit(): void {
    this.post = this.data.post;
    this.postId = this.post?._id;
    this.getLikes();
  }

  getLikes() {
    if (this.postId) {
      this.blogService.getBlogLikes(this.postId).subscribe({
        next: (response) => {
          console.log('likes', response);
          this.likes = response;
        },
        error: (error) => {
          console.log('error', error);
        }
      })
    }
  }

}

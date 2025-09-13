import { Component, inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faThumbsUp as solidThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as regularThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { Post } from '../../../../interfaces/post';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../../services/apis/blog/blog.service';
import { User } from '../../../../interfaces/auth';
import { Store } from '@ngrx/store';
import { userSelector } from '../../../ngrx/ngrx.selector';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PostLikesDialogComponent } from '../../dialogs/post-likes-dialog/post-likes-dialog.component';
import { PostCommentsDialogComponent } from '../../dialogs/post-comments-dialog/post-comments-dialog.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-blog',
  imports: [CommonModule, FontAwesomeModule, ProfileComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit, OnChanges, OnDestroy {
  @Input() blog: Post | undefined;
  @Output() blogUpdated = new EventEmitter<Post>();
  @Output() blogDeleted = new EventEmitter<Post>();

  private blogService = inject(BlogService);
  private store = inject(Store);
  private dialog = inject(MatDialog);

  user: User | undefined;
  solidThumbsUpIcon = solidThumbsUp;
  regularThumbsUpIcon = regularThumbsUp;
  commentIcon = faCommentDots;
  userSubscription$: Subscription | undefined;
  authorId: string | undefined;
  isLiked: boolean = false;
  noOfLikes: number = 0;
  get noOfComments(): number {
    return this.blog?.totalComments || 0;
  }
  userId: string | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['blog'] && this.blog?._id) {
      this.authorId = this.blog?.author?._id;
      this.setLikeComment();
    }
  }

  ngOnInit(): void {
    this.getUser();
  }

  ngOnDestroy(): void {
    if (this.userSubscription$) {
      this.userSubscription$.unsubscribe();
    }
  }

  getUser() {
    this.userSubscription$ = this.store.select(userSelector).subscribe({
      next: (response) => {
        this.user = response;
        this.userId = this.user?._id;
        // console.log('user', this.user);
        this.checkIfLiked();
      }
    })
  }

  setLikeComment() {
    this.checkIfLiked();
    this.noOfLikes = this.blog?.likes?.length || 0;
  }


  like() {
    if (this.blog) {
      this.blogService.likeBlog(this.blog._id).subscribe({
        next: (response) => {
          // console.log('like response', response);
          const likes = response.map(like => {
            return like.user;
          });
          if (this.blog) {
            Object.assign(this.blog, { likes: likes });
          }
          this.setLikeComment();
        },
        error: (error) => {
          console.error('like error', error);
        }
      })
    }
  }

  checkIfLiked() {
    if (this.blog?._id && this.userId) {
      this.isLiked = this.blog?.likes?.includes(this.userId) || false;
    }
  }

  showLikeList() {
    this.dialog.open(PostLikesDialogComponent, {
      width: '30rem',
      maxWidth: '90vw',
      data: {
        post: this.blog,
      }
    }).afterClosed().subscribe((result) => {
      if (result) {

      }
    });
  }

  comment() {
    this.dialog.open(PostCommentsDialogComponent, {
      width: '50rem',
      maxWidth: '90vw',
      data: {
        post: this.blog,
      }
    }).afterClosed().subscribe((result) => {
      this.blogUpdated.emit(this.blog);
    });
  }

  onBlogUpdated(blog: Post) {
    this.blogUpdated.emit(blog);
  }
  onBlogDeleted(blog: Post) {
    this.blogDeleted.emit(blog);
  }
}

import { Component, inject, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../../../interfaces/auth';
import { CommonModule } from '@angular/common';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { userSelector } from '../../../ngrx/ngrx.selector';
import { MatMenuModule } from '@angular/material/menu';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { BlogService } from '../../../services/apis/blog/blog.service';
import { Post } from '../../../../interfaces/post';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditPostDialogComponent } from '../../dialogs/create-edit-post-dialog/create-edit-post-dialog.component';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FontAwesomeModule, MatMenuModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  @Input() user: User | undefined;
  @Input() date: Date | undefined;
  @Input() showMenu: boolean = false;
  @Input() blog: Post | undefined;
  @Output() blogUpdated = new EventEmitter<Post>();

  private store = inject(Store);
  private blogService = inject(BlogService);
  private dialog = inject(MatDialog);

  threeDotMenuIcon = faEllipsis;
  loginUser: User | undefined;

  userIcon = faUser;

  ngOnInit(): void {
    this.store.select(userSelector).subscribe({
      next: (response) => {
        this.loginUser = response;
        // console.log('user', this.user);
      }
    })
  }

  deleteBlog() {
    const postId = this.blog?._id;
    if (postId) {
      this.blogService.deleteBlog(postId).subscribe({
        next: (response) => {
          console.log('Post deleted successfully', response);
          this.blogUpdated.emit(this.blog!);
        },
        error: (error) => {
          console.error('Error deleting post', error);
        }
      });
    }
  }

  editBlog() {
    this.dialog.open(CreateEditPostDialogComponent, {
      width: '50rem',
      maxWidth: '90vw',
      data: {
        blog: this.blog
      }
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.blogUpdated.emit(result);
      }
    });
  }

}

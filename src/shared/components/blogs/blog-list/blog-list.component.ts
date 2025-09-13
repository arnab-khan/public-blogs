import { Component, inject, OnInit } from '@angular/core';
import { BlogService } from '../../../services/apis/blog/blog.service';
import { Post, PostsParams } from '../../../../interfaces/post';
import { BlogComponent } from '../blog/blog.component';
import { CreateEditPostDialogComponent } from '../../dialogs/create-edit-post-dialog/create-edit-post-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { User } from '../../../../interfaces/auth';
import { userSelector } from '../../../ngrx/ngrx.selector';

@Component({
  selector: 'app-blog-list',
  imports: [BlogComponent],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent implements OnInit {

  private dialog = inject(MatDialog);
  private blogService = inject(BlogService);
  private store = inject(Store);

  blogs: Post[] = [];
  user: User | undefined;
  initialBlogsLoading = true;
  page: number = 1;
  itemsPerPage: number = 10;
  hasNext = false;

  ngOnInit(): void {
    this.getInitialBlogs();
    this.store.select(userSelector).subscribe({
      next: (response) => {
        this.user = response;
      }
    });
  }

  getInitialBlogs() {
    this.page = 1;
    this.getBlogs();
  }

  getBlogs() {
    const params: PostsParams = {
      page: this.page,
      itemsPerPage: this.itemsPerPage
    }
    this.blogService.getBlogs(params).subscribe({
      next: (response) => {
        console.log('blogs', response);
        if (this.page && this.page > 1) {
          this.blogs = [...this.blogs, ...response?.posts || []];
        } else {
          this.blogs = response?.posts || [];
        }
        this.hasNext = response?.pagination?.hasNext;
        this.initialBlogsLoading = false;
      },
      error: (error) => {
        console.log('error', error);
      }
    })
  }

  loadMore() {
    this.page++;
    this.getBlogs();
  }

  openCreateEditPostDialog() {
    this.dialog.open(CreateEditPostDialogComponent, {
      width: '50rem',
      maxWidth: '90vw',
      data: {}
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.getInitialBlogs();
      }
    });
  }

  onBlogUpdated(updatedBlog: Post, currentBlog: Post) {
    if (updatedBlog) {
      Object.assign(currentBlog, {
        title: updatedBlog?.title || '',
        content: updatedBlog?.content || '',
      });
    }
  }
}

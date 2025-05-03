import { Component, inject, OnInit } from '@angular/core';
import { BlogService } from '../../../services/apis/blog/blog.service';
import { Post } from '../../../../interfaces/post';
import { BlogComponent } from '../blog/blog.component';
import { CreateEditPostDialogComponent } from '../../dialogs/create-edit-post-dialog/create-edit-post-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-blog-list',
  imports: [BlogComponent],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent implements OnInit {

  private dialog = inject(MatDialog);
  private blogService = inject(BlogService);

  blogs: Post[] = [];

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs() {
    this.blogService.getBlogs().subscribe({
      next: (response) => {
        console.log('blogs', response);
        this.blogs = response;
      },
      error: (error) => {
        console.log('error', error);
      }
    })
  }

  openCreateEditPostDialog() {
    this.dialog.open(CreateEditPostDialogComponent, {
      data: {
        
      }
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.getBlogs();
      }
    });
  }
}

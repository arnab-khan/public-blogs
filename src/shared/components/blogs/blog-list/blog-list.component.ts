import { Component, inject, OnInit } from '@angular/core';
import { BlogService } from '../../../services/apis/blog/blog.service';
import { Post } from '../../../../interfaces/post';
import { BlogComponent } from '../blog/blog.component';

@Component({
  selector: 'app-blog-list',
  imports: [BlogComponent],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent implements OnInit {
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
}

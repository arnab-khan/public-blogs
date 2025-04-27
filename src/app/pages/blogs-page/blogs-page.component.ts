import { Component } from '@angular/core';
import { BlogListComponent } from '../../../shared/components/blogs/blog-list/blog-list.component';

@Component({
  selector: 'app-blogs-page',
  imports: [BlogListComponent],
  templateUrl: './blogs-page.component.html',
  styleUrl: './blogs-page.component.scss'
})
export class BlogsPageComponent {

}

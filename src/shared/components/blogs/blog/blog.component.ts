import { Component, Input } from '@angular/core';
import { Post } from '../../../../interfaces/post';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog',
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
@Input() blog: Post | undefined;
}

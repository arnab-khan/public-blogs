import { Component, inject, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsInformationService } from '../../../services/form/forms-information/forms-information.service';
import { BlogService } from '../../../services/apis/blog/blog.service';
import { CreatePost, Post } from '../../../../interfaces/post';
import { CommonFormComponent } from '../common-form/common-form.component';
import { ControllValue } from '../../../../interfaces/forms-information';

@Component({
  selector: 'app-create-edit-post',
  imports: [CommonFormComponent],
  templateUrl: './create-edit-post.component.html',
  styleUrl: './create-edit-post.component.scss'
})
export class CreateEditPostComponent implements OnChanges {
  private formsInformationService = inject(FormsInformationService);
  private blogService = inject(BlogService);

  formValue: ControllValue = {};

  @Output() blogCreated = new EventEmitter<any>();
  @Input() blog: Post | undefined;

  formInformation = this.formsInformationService.forms.post();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['blog'] && this.blog?._id) {
      this.formValue = {
        title: this.blog?.title,
        content: this.blog?.content,
      }
      this.formInformation = this.formsInformationService.forms.editPost();
    }
  }

  createBlog(body: CreatePost) {
    if (this.blog) {
      this.blogService.updateBlog(this.blog._id!, body).subscribe({
        next: (response) => {
          console.log('response', response);
          this.blogCreated.emit(response);
        },
        error: (error) => {
          console.log('error', error);
        },
      });
    } else {
      this.blogService.createBlog(body).subscribe({
        next: (response) => {
          console.log('response', response);
          this.blogCreated.emit(response);
        },
        error: (error) => {
          console.log('error', error);
        },
      });
    }
  }
}

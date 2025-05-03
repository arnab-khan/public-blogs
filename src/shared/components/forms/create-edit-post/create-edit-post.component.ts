import { Component, inject } from '@angular/core';
import { FormsInformationService } from '../../../services/form/forms-information/forms-information.service';
import { BlogService } from '../../../services/apis/blog/blog.service';
import { CreatePost } from '../../../../interfaces/post';
import { CommonFormComponent } from '../common-form/common-form.component';

@Component({
  selector: 'app-create-edit-post',
  imports: [CommonFormComponent],
  templateUrl: './create-edit-post.component.html',
  styleUrl: './create-edit-post.component.scss'
})
export class CreateEditPostComponent {
  private formsInformationService = inject(FormsInformationService);
  private blogService = inject(BlogService);

  formInformation = this.formsInformationService.forms.post();

  createBlog(body: CreatePost) {
    this.blogService.createBlog(body).subscribe({
      next: (response) => {
        console.log('response', response);

      },
      error: (error) => {
        console.log('error', error);
      }
    })
  }
}

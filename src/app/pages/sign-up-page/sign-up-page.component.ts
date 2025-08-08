import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpComponent } from '../../../shared/components/forms/sign-up/sign-up.component';

@Component({
  selector: 'app-sign-up-page',
  imports: [SignUpComponent],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.scss'
})
export class SignUpPageComponent {
  private router = inject(Router);

  onUserCreated(event: any) {
    if (event) {
      this.router.navigate(['/blogs']);
    }
  }
}

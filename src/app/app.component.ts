import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../shared/services/apis/auth/auth.service';
import { Store } from '@ngrx/store';
import { saveUser } from '../shared/ngrx/ngrx.action';
import { HeaderComponent } from '../shared/components/layout/header/header.component';
import { FooterComponent } from '../shared/components/layout/footer/footer.component';
import { getToken } from '../shared/utils/local-storage';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);
  private store = inject(Store)

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    const token = getToken();
    if (token) {
      this.authService.getUser().subscribe({
        next: (response) => {
          console.log('user', response);
          this.store.dispatch(saveUser(response));
        },
        error: (error) => {
          console.log('error', error);
        }
      })
    }
  }
}

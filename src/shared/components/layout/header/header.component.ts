import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../../../interfaces/auth';
import { Store } from '@ngrx/store';
import { userSelector } from '../../../ngrx/ngrx.selector';
import { removeUser } from '../../../ngrx/ngrx.action';
import { removeToken } from '../../../utils/local-storage';
import { ProfileComponent } from '../../blogs/profile/profile.component';

@Component({
  selector: 'app-header',
  imports: [RouterModule, ProfileComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);

  user: User | undefined;
  
  ngOnInit(): void {
    this.store.select(userSelector).subscribe({
      next: (response) => {
        this.user = response;
        // console.log('user', this.user);
      }
    })
  }
  
  logout() {
    this.store.dispatch(removeUser());
    removeToken();
    this.router.navigate(['/login']);
  }
}

import { Component, inject, Input, OnInit } from '@angular/core';
import { User } from '../../../../interfaces/auth';
import { CommonModule } from '@angular/common';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { userSelector } from '../../../ngrx/ngrx.selector';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FontAwesomeModule, MatMenuModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  @Input() user: User | undefined;
  @Input() date: Date | undefined;
  @Input() showMenu: boolean = false;

  private store = inject(Store);

  threeDotMenuIcon = faEllipsis;
  loginUser: User | undefined;

  ngOnInit(): void {
    this.store.select(userSelector).subscribe({
      next: (response) => {
        this.loginUser = response;
        // console.log('user', this.user);
      }
    })
  }

}

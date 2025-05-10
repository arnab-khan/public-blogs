import { Component, Input } from '@angular/core';
import { User } from '../../../../interfaces/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  @Input() user: User | undefined;
  @Input() date: Date | undefined;
}

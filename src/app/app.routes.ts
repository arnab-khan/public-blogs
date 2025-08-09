import { Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { GuestGuard } from '../shared/guards/guest.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'blogs',
        pathMatch: 'full'
    },
    {
        path: 'sign-up',
        loadComponent: () => import('./pages/sign-up-page/sign-up-page.component').then(m => m.SignUpPageComponent),
        canActivate: [GuestGuard]
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login-page/login-page.component').then(m => m.LoginPageComponent),
        canActivate: [GuestGuard]
    },
    {
        path: 'blogs',
        loadComponent: () => import('./pages/blogs-page/blogs-page.component').then(m => m.BlogsPageComponent)
    },
    {
        path: 'edit-profile',
        loadComponent: () => import('./pages/edit-profile-page/edit-profile-page.component').then(m => m.EditProfilePageComponent),
        canActivate: [AuthGuard]
    },
];
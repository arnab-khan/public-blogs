import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'blogs',
        pathMatch: 'full'
    },
    {
        path: 'sign-up',
        loadComponent: () => import('./pages/sign-up-page/sign-up-page.component').then(m => m.SignUpPageComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login-page/login-page.component').then(m => m.LoginPageComponent)
    },
    {
        path: 'blogs',
        loadComponent: () => import('./pages/blogs-page/blogs-page.component').then(m => m.BlogsPageComponent)
    },
    {
        path: 'edit-profile',
        loadComponent: () => import('./pages/edit-profile-page/edit-profile-page.component').then(m => m.EditProfilePageComponent)
    },
];
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'sign-up',
        loadComponent: () => import('./pages/sign-up-page/sign-up-page.component').then(m => m.SignUpPageComponent)
    },
];

import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { UsersFeature } from './state/user.feature';
import UsersEffects from './state/user.effects';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/header/header.component').then(
        (c) => c.HeaderComponent
      ),
    providers: [
      provideState({
        name: UsersFeature.name,
        reducer: UsersFeature.reducer,
      }),
      provideEffects(UsersEffects),
    ],
    children: [
      {
        path: ':userId',
        loadComponent: () =>
          import('./components/user/user-details/user-details.component').then(
            (c) => c.UserDetailsComponent
          ),
      },
      {
        path: '',
        loadComponent: () =>
          import('./components/user/users-list/users-list.component').then(
            (c) => c.UsersListComponent
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

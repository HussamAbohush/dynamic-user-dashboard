// Importing necessary modules from Angular
import { Routes } from '@angular/router';

// Importing Ngrx store and effects related functions
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

// Importing the UsersFeature and UsersEffects from the project
import { UsersFeature } from './state/user.feature';
import UsersEffects from './state/user.effects';

// Defining the routes for the application using Angular's Routes type
export const routes: Routes = [
  {
    // Root path
    path: '',

    // Lazy loading the HeaderComponent when the root path is accessed
    loadComponent: () =>
      import('./components/header/header.component').then(
        (c) => c.HeaderComponent
      ),

    // Providing the state and effects for the 'users' feature
    providers: [
      provideState({
        name: UsersFeature.name,
        reducer: UsersFeature.reducer,
      }),
      provideEffects(UsersEffects),
    ],

    // Child routes for the 'users' feature
    children: [
      {
        // Path for user details with dynamic userId parameter
        path: ':userId',

        // Lazy loading the UserDetailsComponent when the 'userId' path is accessed
        loadComponent: () =>
          import('./components/user/user-details/user-details.component').then(
            (c) => c.UserDetailsComponent
          ),
      },
      {
        // Default path for displaying the list of users
        path: '',

        // Lazy loading the UsersListComponent when the root path is accessed
        loadComponent: () =>
          import('./components/user/users-list/users-list.component').then(
            (c) => c.UsersListComponent
          ),
      },
    ],
  },

  // Redirecting any other route not matched above to the root path
  { path: '**', redirectTo: '' },
];

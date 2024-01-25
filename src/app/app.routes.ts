// Importing necessary modules from Angular
import { Routes } from '@angular/router';

// Defining the routes for the application using Angular's Routes type
export const routes: Routes = [
  // Lazy loading the 'users' module using the loadChildren property
  // The module is loaded asynchronously when the 'users' path is accessed
  {
    path: 'users',
    loadChildren: () => import('./user.routes').then((m) => m.routes),
  },

  // Redirecting any other route not matched above to the 'users' path
  { path: '**', redirectTo: 'users' },
];

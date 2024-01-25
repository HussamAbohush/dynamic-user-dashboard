// Importing necessary functions from Ngrx
import { createActionGroup, props } from '@ngrx/store';

// Importing the User model from the project
import { User } from './models/user.model';

// Creating a group of actions related to users using createActionGroup
export const UsersActions = createActionGroup({
  // Action group source or namespace
  source: 'Users/API',

  // Defining individual action events with their associated payload types
  events: {
    // Action to get a user by userId
    'Get User': props<{ userId: number }>(),

    // Action when getting a user is successful
    'Get User Success': props<User>(),

    // Action when getting a user fails, includes an error message
    'Get User Failed': props<{ message: string }>(),

    // Action to get a list of users, optional 'page' parameter
    'Get Users List': props<{ page?: number }>(),

    // Action when getting a list of users is successful
    'Get Users List Success': props<{
      users: User[];
      totalUsers: number;
      page: number;
      totalPages: number;
      totalUsersPerPage: number;
    }>(),

    // Action when getting a list of users fails, includes an error message
    'Get Users List Failed': props<{ message: string }>(),
  },
});

import { createActionGroup, props } from '@ngrx/store';
import { User } from './models/user.model';

export const UsersActions = createActionGroup({
  source: 'Users/API',
  events: {
    'Get User': props<{ userId: number }>(),
    'Get User Success': props<User>(),
    'Get User Failed': props<{ message: string }>(),
    'Get Users List': props<{ page?: number }>(),
    'Get Users List Success': props<{
      users: User[];
      totalUsers: number;
      page: number;
      totalPages: number;
      totalUsersPerPage: number;
    }>(),
    'Get Users List Failed': props<{ message: string }>(),
  },
});

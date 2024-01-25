// Importing necessary modules from Ngrx
import { createSelector } from '@ngrx/store';

// Importing the UsersFeature, adapter, and User model from the project
import { UsersFeature, adapter } from './user.feature';
import { User } from './models/user.model';

// Selector to get pagination-related information from the users state
export const selectPagination = createSelector(
  UsersFeature.selectUsersState,
  ({ totalPages, page, totalUsers, totalUsersPerPage }) => ({
    totalPages,
    page,
    totalUsers,
    totalUsersPerPage,
  })
);

// Selector to get a specific user by ID from the entities in the users state
export const selectUserById = (userId: number) =>
  createSelector(
    UsersFeature.selectUsersState,
    ({ entities }) => entities[userId]
  );

// Selector to get an array of all users from the entities in the users state
export const selectUsers = createSelector(
  UsersFeature.selectEntities,
  (entities) =>
    Object.values(entities).filter((user): user is User => !!user)
);

// Destructuring to get selectLoading and selectError from UsersFeature
export const { selectLoading, selectError } = UsersFeature;

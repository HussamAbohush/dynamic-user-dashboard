import { createSelector } from '@ngrx/store';
import { UsersFeature, adapter } from './user.feature';
import { User } from './models/user.model';

export const selectPagination = createSelector(
  UsersFeature.selectUsersState,
  ({ totalPages, page, totalUsers, totalUsersPerPage }) => ({
    totalPages,
    page,
    totalUsers,
    totalUsersPerPage,
  })
);

export const selectUserById = (userId: number) =>
  createSelector(
    UsersFeature.selectUsersState,
    ({ entities }) => entities[userId]
  );

export const selectUsers = createSelector(
  UsersFeature.selectEntities,
  (entities) =>
    Object.values(entities).filter((user): user is User => !!user)
);

export const { selectLoading, selectError } = UsersFeature;

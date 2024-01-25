// Importing necessary modules from Angular, Ngrx, RxJS, and the project
import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { UsersService } from '../services/user.service';
import { State, UsersFeature } from './user.feature';
import { UsersActions } from './user.actions';

// Injectable decorator to mark the class as injectable
@Injectable()
export default class UsersEffects {
  // Constructor with injected dependencies
  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private store: Store<State>
  ) {}

  // Effect for handling the getUser action
  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.getUser),

      // Combining the action with the latest user entity from the store
      concatLatestFrom((action) =>
        this.store
          .select(UsersFeature.selectEntities)
          .pipe(map((entities) => entities[action.userId]))
      ),

      // Switching to the appropriate observable based on whether the user is already in the store
      switchMap(([action, user]) =>
        (user
          ? of(user)
          : this.usersService
              .findById(action.userId)
              .pipe(map((response) => response.data))
        ).pipe(
          // Mapping the result to getUserSuccess action
          map((user) => UsersActions.getUserSuccess(user)),

          // Handling errors and mapping to getUserFailed action
          catchError((error) =>
            of(
              UsersActions.getUserFailed({
                message:
                  error.message ?? `Unable to get the user ${action.userId}`,
              })
            )
          )
        )
      )
    )
  );

  // Effect for handling the getUsersList action
  getUsersList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.getUsersList),

      // Switching to the usersService.find observable
      switchMap((action) =>
        this.usersService.find(action.page).pipe(
          // Mapping the result to getUsersListSuccess action
          map((data) =>
            UsersActions.getUsersListSuccess({
              users: data.data,
              totalUsers: data.total,
              page: data.page,
              totalPages: data.total_pages,
              totalUsersPerPage: data.per_page,
            })
          ),

          // Handling errors and mapping to getUserFailed action
          catchError((error) =>
            of(
              UsersActions.getUserFailed({
                message: error.message ?? 'Unable to get users list',
              })
            )
          )
        )
      )
    )
  );
}

// Importing necessary modules from Ngrx
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

// Importing the UsersActions and User model from the project
import { UsersActions } from './user.actions';
import { User } from './models/user.model';

// Creating an entity adapter for managing users
export const adapter = createEntityAdapter<User>();

// Defining the state interface that extends EntityState<User> with additional properties
export interface State extends EntityState<User> {
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  totalUsers: number;
  totalUsersPerPage: number;
}

// Initializing the state using the entity adapter's initial state
const initialState: State = adapter.getInitialState({
  loading: false,
  error: null,
  page: 0,
  totalUsers: 0,
  totalPages: 0,
  totalUsersPerPage: 0,
});

// Creating the feature for the 'users' state, including reducer logic
export const UsersFeature = createFeature({
  // Feature name
  name: 'users',

  // Reducer function created using createReducer from Ngrx
  reducer: createReducer(
    initialState,
    // Handling the getUser action
    on(UsersActions.getUser, (state, _action) => ({
      ...state,
      loading: true,
      error: null,
    })),

    // Handling the getUserSuccess action
    on(UsersActions.getUserSuccess, (state, action) =>
      adapter.setOne(action, {
        ...state,
        loading: false,
        error: null,
      })
    ),

    // Handling the getUserFailed action
    on(UsersActions.getUserFailed, (_state, action) => ({
      ..._state,
      loading: false,
      error: action.message,
    })),

    // Handling the getUsersList action
    on(UsersActions.getUsersList, (state, _action) => ({
      ...state,
      loading: true,
      error: null,
    })),

    // Handling the getUsersListSuccess action
    on(UsersActions.getUsersListSuccess, (state, action) =>
      adapter.setAll(action.users, {
        ...state,
        loading: false,
        error: null,
        totalUsers: action.totalUsers,
        page: action.page,
        totalPages: action.totalPages,
        totalUsersPerPage: action.totalUsersPerPage,
      })
    ),

    // Handling the getUsersListFailed action
    on(UsersActions.getUsersListFailed, (state, action) => ({
      ...state,
      loading: false,
      error: action.message,
    }))
  ),
});

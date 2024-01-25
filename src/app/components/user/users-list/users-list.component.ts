// Importing necessary modules and components from Angular and Angular Material
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Importing Ngrx store and related features
import { Store } from '@ngrx/store';
import { State } from '../../../state/user.feature';
import {
  selectError,
  selectLoading,
  selectPagination,
  selectUsers,
} from '../../../state/user.selectors';
import { UsersActions } from '../../../state/user.actions';

// Component decorator specifying metadata for the component
@Component({
  selector: 'app-users-list', // Selector for the component
  standalone: true, // Custom property (not standard Angular property)
  imports: [
    // Angular and Angular Material modules used by the component
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: 'users-list.component.html', // Template file for the component
  styles: `` // Inline styles for the component
})
export class UsersListComponent implements OnInit {
  // Observables for component state
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);
  users$ = this.store.select(selectUsers);
  pagination$ = this.store.select(selectPagination);

  // Constructor with injected dependencies (Store<State>)
  constructor(private store: Store<State>) {}

  // Lifecycle hook - ngOnInit is called after the component is initialized
  ngOnInit(): void {
    // Dispatching an action to get the list of users when the component is initialized
    this.store.dispatch(UsersActions.getUsersList({ page: 1 }));
  }

  // Method to handle page change events from the paginator
  handlePageEvent(e: PageEvent) {
    // Dispatching an action to get the list of users for the selected page
    this.store.dispatch(UsersActions.getUsersList({ page: e.pageIndex + 1 }));
  }
}

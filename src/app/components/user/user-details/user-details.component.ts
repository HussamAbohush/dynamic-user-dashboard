// Importing necessary modules and components from Angular and Angular Material
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

// Importing Ngrx store and related features
import { Store } from '@ngrx/store';
import { State } from '../../../state/user.feature';
import { selectError, selectLoading, selectUserById } from '../../../state/user.selectors';
import { EMPTY, Subscription, switchMap, tap } from 'rxjs';
import { UsersActions } from '../../../state/user.actions';

// Component decorator specifying metadata for the component
@Component({
  selector: 'app-user-profile', // Selector for the component
  standalone: true, // Custom property (not standard Angular property)
  imports: [
    // Angular and Angular Material modules used by the component
    CommonModule,
    MatCardModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  providers: [], // Providers for the component
  templateUrl: './user-details.component.html', // Template file for the component
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  // Subscription to manage RxJS subscriptions
  subs = new Subscription();

  // Observables for component state
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);

  // Observable for user details
  user$ = this.route.params.pipe(
    switchMap((params) => {
      const userId = parseInt(params['userId']);
      return isFinite(userId) ? this.store.select(selectUserById(userId)) : EMPTY;
    })
  );

  // Constructor with injected dependencies (Store<State>, ActivatedRoute)
  constructor(private store: Store<State>, private route: ActivatedRoute) {}

  // Lifecycle hook - ngOnInit is called after the component is initialized
  ngOnInit(): void {
    // Subscribing to route params changes to fetch user details
    this.subs.add(
      this.route.params
        .pipe(
          // Extracting userId from params and dispatching getUser action
          tap((params) => {
            const userId = parseInt(params['userId']);
            if (isFinite(userId))
              this.store.dispatch(UsersActions.getUser({ userId }));
          })
        )
        .subscribe()
    );
  }

  // Lifecycle hook - ngOnDestroy is called before the component is destroyed
  ngOnDestroy(): void {
    // Unsubscribing from subscriptions to prevent memory leaks
    this.subs.unsubscribe();
  }
}

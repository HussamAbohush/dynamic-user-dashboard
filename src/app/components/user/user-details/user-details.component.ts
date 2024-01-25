import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { State } from '../../../state/user.feature';
import {
  selectError,
  selectLoading,
  selectUserById,
} from '../../../state/user.selectors';
import { EMPTY, Subscription, switchMap, tap } from 'rxjs';
import { UsersActions } from '../../../state/user.actions';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  providers: [],
  templateUrl: './user-details.component.html',
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  subs = new Subscription();

  loading$ = this.store.select(selectLoading);

  error$ = this.store.select(selectError);

  user$ = this.route.params.pipe(
    switchMap((params) => {
      const userId = parseInt(params['userId']);
      return isFinite(userId)
        ? this.store.select(selectUserById(userId))
        : EMPTY;
    })
  );

  constructor(private store: Store<State>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subs.add(this.route.params
      .pipe(
        tap((params) => {
          const userId = parseInt(params['userId']);
          if (isFinite(userId))
            this.store.dispatch(UsersActions.getUser({ userId }));
        })
      )
      .subscribe()) 
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

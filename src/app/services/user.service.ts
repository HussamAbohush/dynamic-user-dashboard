import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../state/models/user.model';

type FindByIdResponse = {
  data: User;
  url: string;
  text: string;
};

type FindResponse = {
  data: User[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
};

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'https://reqres.in/api/users';
  constructor(private httpClient: HttpClient) {}

  findById(userId: number) {
    return this.httpClient.get<FindByIdResponse>(
      `${this.apiUrl}/${userId}`
    );
  }

  find(page?: number) {
    return this.httpClient.get<FindResponse>(`${this.apiUrl}`, {
      params: { page: page ?? '' },
    });
  }
}

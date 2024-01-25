// Importing necessary modules from Angular
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Importing the User model from the project
import { User } from '../state/models/user.model';

// TypeScript types for API response
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

// Injectable decorator to mark the service as injectable and provide it in the root injector
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  // Base URL for the API
  private apiUrl = 'https://reqres.in/api/users';

  // Constructor with injected dependencies (HttpClient)
  constructor(private httpClient: HttpClient) {}

  // Method to retrieve user data by userId
  findById(userId: number) {
    return this.httpClient.get<FindByIdResponse>(`${this.apiUrl}/${userId}`);
  }

  // Method to retrieve a list of users with optional pagination
  find(page?: number) {
    return this.httpClient.get<FindResponse>(`${this.apiUrl}`, {
      params: { page: page ?? '' }, // Optional pagination parameter
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toHttpParams } from '../../../utils/http';
import { environment } from '../../../../environments/environment';
import { CheckUsername, CreateUser, LoginUser, User, UserResponse } from '../../../../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpClient = inject(HttpClient);
  private baseApiUrl = `${environment.rootApiUrl}/auth`;

  checkIfUserExists(userName: string) {
    return this.httpClient.get<CheckUsername>(`${this.baseApiUrl}/check-username?${toHttpParams({ userName: userName })}`);
  }

  createUser(body: CreateUser) {
    return this.httpClient.post<UserResponse>(`${this.baseApiUrl}/register`, body);
  }

  loginUser(body: LoginUser) {
    return this.httpClient.post<UserResponse>(`${this.baseApiUrl}/login`, body);
  }

  getUser() {
    return this.httpClient.get<User>(`${this.baseApiUrl}/user`);
  }
}

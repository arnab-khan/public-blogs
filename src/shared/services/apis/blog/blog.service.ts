import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CheckUsername } from '../../../../interfaces/auth';
import { toHttpParams } from '../../../utils/http';
import { Post } from '../../../../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private httpClient = inject(HttpClient);
  private baseApiUrl = `${environment.rootApiUrl}/post`;

  getBlogs() {
    return this.httpClient.get<Post[]>(this.baseApiUrl);
  }

  checkIfUserExists(userName: string) {
    return this.httpClient.get<CheckUsername>(`${this.baseApiUrl}/check-username?${toHttpParams({ userName: userName })}`);
  }
}

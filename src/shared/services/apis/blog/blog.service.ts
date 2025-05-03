import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CheckUsername } from '../../../../interfaces/auth';
import { CreatePost, Like, LikeResponse, Post } from '../../../../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private httpClient = inject(HttpClient);
  private baseApiUrl = `${environment.rootApiUrl}/post`;

  getBlogs() {
    return this.httpClient.get<Post[]>(this.baseApiUrl);
  }

  createBlog(body: CreatePost) {
    return this.httpClient.post<CheckUsername>(`${this.baseApiUrl}/create`, body);
  }

  likeBlog(postId: string) {
    return this.httpClient.patch<CheckUsername>(`${this.baseApiUrl}/${postId}/like`, null);
  }

  getBlogLikes(postId: string) {
    return this.httpClient.get<LikeResponse[]>(`${this.baseApiUrl}/${postId}/likes`);
  }
}
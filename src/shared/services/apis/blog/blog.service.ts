import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CheckUsername } from '../../../../interfaces/auth';
import { Comment, CreatePost, Like, LikeResponse, Post } from '../../../../interfaces/post';

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
    return this.httpClient.patch<Like[]>(`${this.baseApiUrl}/${postId}/like`, null);
  }

  getBlogLikes(postId: string) {
    return this.httpClient.get<LikeResponse[]>(`${this.baseApiUrl}/${postId}/likes`);
  }

  addComment(postId: string, content: string) {
    return this.httpClient.post<Like>(`${this.baseApiUrl}/${postId}/comment`, { content });
  }

  getBlogComments(postId: string) {
    return this.httpClient.get<Comment[]>(`${this.baseApiUrl}/${postId}/comments`);
  }

  deleteBlog(postId: string) {
    return this.httpClient.delete<{ message: string }>(`${this.baseApiUrl}/${postId}`);
  }

  updateBlog(postId: string, body: { title?: string; content?: string }) {
    return this.httpClient.patch<Post>(`${this.baseApiUrl}/${postId}`, body);
  }
}
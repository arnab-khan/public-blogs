import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CheckUsername } from '../../../../interfaces/auth';
import { Comment, CreatePost, Like, LikeResponse, Post, PostsParams, PostsResponse } from '../../../../interfaces/post';
import { toHttpParams } from '../../../utils/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private httpClient = inject(HttpClient);
  private baseApiUrl = `${environment.rootApiUrl}/post`;

  getBlogs(params: PostsParams) {
    const httpParams = params ? toHttpParams(params) : undefined;
    return this.httpClient.get<PostsResponse>(this.baseApiUrl, { params: httpParams });
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

  editComment(postId: string, commentId: string, content: string) {
    return this.httpClient.patch<Comment[]>(`${this.baseApiUrl}/${postId}/comment/${commentId}`, { content });
  }

  deleteComment(postId: string, commentId: string) {
    return this.httpClient.delete<{ message: string }>(`${this.baseApiUrl}/${postId}/comment/${commentId}`);
  }
}
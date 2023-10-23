import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBlog } from 'src/app/core/models/blog.model';
@Injectable({
  providedIn: 'root',
})
export class BlogDataService {
  urlData: string = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<IBlog[]> {
    return this.httpClient.get<IBlog[]>(this.urlData);
  }

  getById(id: string | null): Observable<IBlog> {
    return this.httpClient.get<IBlog>(`${this.urlData}/${id}`);
  }

  createArticle(article: {
    title: string;
    content: string;
  }): Observable<IBlog> {
    return this.httpClient.post<IBlog>(this.urlData, null);
  }

  updateArticle(article: any): Observable<any> {
    return this.httpClient.put(
      `${this.urlData}/${article.id}`,
      JSON.stringify(article)
    );
  }

  deleteArticle(id: string): Observable<any> {
    return this.httpClient.delete(`${this.urlData}/${id}`);
  }
}

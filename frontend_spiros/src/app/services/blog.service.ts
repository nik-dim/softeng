import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Blog } from '@models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private blogsUrl = 'http://localhost:8080/blog';

  constructor(
    private http: HttpClient
  ) { }

  public getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.blogsUrl)
  }

  public getBlog(id: number): Observable<Blog> {
    const url = `${this.blogsUrl}/${id}`;
    return this.http.get<Blog>(url);
  }

  public addBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(this.blogsUrl, JSON.parse(JSON.stringify(blog)));
  }

}

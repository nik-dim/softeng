import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Blog } from './blog';

@Injectable({
  providedIn: 'root'
})
export class BlogDataService {

  private blogsUrl = 'http://localhost:8080/blog';

  constructor(
    private http: HttpClient
  ) { }

  public getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.blogsUrl)
    .pipe(
      catchError(this.handleError('get all blogs', []))
    );
  }

  public getBlog(id: number): Observable<Blog> {
    /* Backticks used to print string literal with values from vars */
    const url = `${this.blogsUrl}/${id}`;
    return this.http.get<Blog>(url)
    .pipe(
      catchError(this.handleError<Blog>(`getBlog id = ${id}`))
    );
  }

  public addBlog(blog: Blog): Observable<Blog> {
    console.log('I am addBlog');
    console.log(`Got blog ${blog.title} ${blog.content}`);
    return this.http.post<Blog>(this.blogsUrl, blog)
    .pipe(
      catchError(this.handleError<Blog>('addBlog'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(operation);
      return of(result as T);
    }
  }
}

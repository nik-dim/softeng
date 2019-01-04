import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Tag } from '@models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private tagsUrl = 'http://localhost:8080/tags';

  constructor(
    private http: HttpClient
  ) { }

  public getTags (): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.tagsUrl)
  }

}

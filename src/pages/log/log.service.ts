import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Pagedmessage } from '../../models/message.type';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private readonly logUrl = 'api/log';

  constructor(private httpClient: HttpClient) {}

  getPage(
    username: string,
    startIndex: number,
    limit: number
  ): Observable<Pagedmessage> {
    return this.httpClient
      .get<Pagedmessage>(`${this.logUrl}/${username}`, {
        params: { size: limit, startIndex: startIndex },
        responseType: 'json',
        observe: 'body',
      })
      .pipe(retry(2), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error(`Error connecting to API: ${error.error}`);
    } else {
      console.error(`API returned code ${error.status}, body was: `);
    }
    return throwError(
      () => new Error(`API returned ${error.status} ${error.statusText}`)
    );
  }
}

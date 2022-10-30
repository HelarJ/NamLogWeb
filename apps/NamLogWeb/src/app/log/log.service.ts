import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Pagedmessage } from "../../model/pagedmessage.type";


@Injectable({
  providedIn: 'root'
})
export class LogService {
  logUrl = "api/log/"

  constructor(private http: HttpClient) { }

  getPage(username: string, page:number, limit:number): Observable<Pagedmessage>{
    return this.http.get<Pagedmessage>(this.logUrl+username, {params:{size:limit, page:page}, responseType:"json", observe:"body"})
      .pipe(retry(2),
        catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error("Error connecting to API:", error.error);
    } else {
      console.error(`API returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error("API returned " + error.status + " "+ error.statusText + "."));
  }
}

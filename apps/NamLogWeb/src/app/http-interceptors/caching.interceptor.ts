import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { RequestCache } from "./request-cache.service";
import { startWith, tap } from "rxjs/operators";

/**
 * Code from https://angular.io/guide/http#caching-requests
 */
@Injectable()
export class CachingInterceptor implements HttpInterceptor {

  constructor(private cache: RequestCache) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!isCacheable(request)) {
      return next.handle(request);
    }
    const cached = this.cache.get(request)
    if (request.headers.get('x-refresh')) {
      const results$ = sendRequest(request, next, this.cache);
      return cached ?
        results$.pipe(startWith(cached)) :
        results$;
    }
    return cached ?
      of(cached) : sendRequest(request, next, this.cache);
  }
}

function isCacheable(req: HttpRequest<any>) {
  return req.method === 'GET'
}

function sendRequest(
  req: HttpRequest<any>,
  next: HttpHandler,
  cache: RequestCache): Observable<HttpEvent<any>> {
  return next.handle(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        cache.put(req, event);
      }
    })
  );
}

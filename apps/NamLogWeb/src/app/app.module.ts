import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LogComponent } from './log/log.component';
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { httpInterceptorProviders } from './http-interceptors';
import {RequestCache, RequestCacheWithMap} from "./http-interceptors/request-cache.service";
import { HomeComponent} from "./home/home.component";

@NgModule({
  declarations: [
    AppComponent,
    LogComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule
  ],
  providers: [
    {provide: RequestCache, useClass: RequestCacheWithMap},
    httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

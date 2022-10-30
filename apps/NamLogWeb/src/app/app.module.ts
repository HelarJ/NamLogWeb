import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LogComponent } from './log/log.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { httpInterceptorProviders } from './http-interceptors';
import {
  RequestCache,
  RequestCacheWithMap,
} from './http-interceptors/request-cache.service';
import { HomeComponent } from './home/home.component';
import { InputTextModule } from 'primeng/inputtext';
import { MenuComponent } from './menu/menu.component';
import { TabMenuModule } from "primeng/tabmenu";
import { MessageModule } from "primeng/message";
import { TableModule } from "primeng/table";

@NgModule({
  declarations: [AppComponent, LogComponent, HomeComponent, MenuComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    InputTextModule,
    TabMenuModule,
    MessageModule,
    TableModule
  ],
  providers: [
    { provide: RequestCache, useClass: RequestCacheWithMap },
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

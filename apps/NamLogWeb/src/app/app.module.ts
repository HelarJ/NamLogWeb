import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { LogComponent } from "./log/log.component";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { httpInterceptorProviders } from "./http-interceptors";
import { RequestCache, RequestCacheWithMap } from "./http-interceptors/request-cache.service";
import { HomeComponent } from "./home/home.component";
import { MenuComponent } from "./menu/menu.component";
import { MessageModule } from "primeng/message";
import { TableModule } from "primeng/table";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { InputTextModule } from "primeng/inputtext";
import { TabMenuModule } from "primeng/tabmenu";

@NgModule({
  declarations: [AppComponent, LogComponent, HomeComponent, MenuComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
    TableModule,
    InfiniteScrollModule,
    InputTextModule,
    TabMenuModule
  ],
  providers: [
    { provide: RequestCache, useClass: RequestCacheWithMap },
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

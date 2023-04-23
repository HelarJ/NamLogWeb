import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";

bootstrapApplication(AppComponent, {
  providers: [provideRouter(appRoutes, withEnabledBlockingInitialNavigation()), importProvidersFrom(HttpClientModule)],
}).catch((err) => console.error(err));

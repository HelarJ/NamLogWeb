import { Route } from '@angular/router';
import {HomeComponent} from "../pages/home/home.component";
import {LogComponent} from "../pages/log/log.component";

export const appRoutes: Route[] = [
    { path: 'home', component: HomeComponent, title: 'AAUGH' },
    { path: 'logs/:username', component: LogComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

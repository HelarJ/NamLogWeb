import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LogComponent} from "./log/log.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path: "home", component: HomeComponent, title: "AAUGH"},
  {path: "logs/:username", component: LogComponent, title: "Logs"}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

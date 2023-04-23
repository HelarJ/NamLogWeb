import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ToolbarComponent} from "../toolbar/toolbar.component";

@Component({
  standalone: true,
  imports: [RouterModule, ToolbarComponent],
  selector: 'nam-log-web-root',
  template: `
    <nam-log-web-toolbar></nam-log-web-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [
  ]
})
export class AppComponent {
}

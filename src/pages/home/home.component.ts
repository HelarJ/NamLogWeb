import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'nam-log-web-home',
  standalone: true,
  template: `
    <img ngSrc="https://cdn.betterttv.net/emote/6063aa98a407570b72f28321/3x" alt="fish" class="fish" width="300" height="300" priority>
  `,
  imports: [
    NgOptimizedImage
  ],
  styles: []
})
export class HomeComponent {
}

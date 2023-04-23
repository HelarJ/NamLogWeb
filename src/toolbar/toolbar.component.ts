import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'nam-log-web-toolbar',
  standalone: true,
  imports: [CommonModule, TabMenuModule],
  template: ` <p-tabMenu [model]="items"></p-tabMenu> `,
  styles: [],
})
export class ToolbarComponent {
  items: MenuItem[] = [
    { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/home'] },
    {
      label: 'Logs',
      icon: 'pi pi-fw pi-search',
      routerLink: ['/logs', 'moonmoon'],
    },
  ];
}

import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";
import { Router } from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  items!: MenuItem[];
  activeItem!: MenuItem;
  constructor(private router: Router) {

  }

  ngOnInit(): void {

    this.items = [
      {label: 'Home', icon: 'pi pi-fw pi-home', routerLink:['/home']},
      {label: 'Logs', icon: 'pi pi-fw pi-search', routerLink:['/logs', 'moonmoon']},
    ];
    this.activeItem = this.items[1]
  }
}

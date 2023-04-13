import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarItem } from 'src/app/header/models/navbar-item';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent {
  constructor(private router: Router) {}

  onSelect(navItem: NavbarItem) {
    if (navItem.url) {
      this.router.navigateByUrl(navItem.url);
    }
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarItem } from '../../models/navbar-item';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  baseUrl: string = 'https://localhost:7137/api/';

  constructor(private router: Router) {}

  data: any[] = [
    { id: 1, name: 'ექიმები', url: 'home', isSelected: true },
    { id: 2, name: 'კლინიკები', url: '' },
    { id: 3, name: 'ანოტაციები', url: '' },
    { id: 4, name: 'აქციები', url: '' },
    { id: 5, name: 'სერვისები', url: '' },
    { id: 6, name: 'მედიკამენტები', url: '' },
    { id: 7, name: 'კონტაქტი', url: '' },
  ];

  onSelect(navbaritem: NavbarItem) {
    navbaritem.id;
    for (let item of this.data) {
      if (item.id === navbaritem.id) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
    }
    this.router.navigateByUrl(navbaritem.url);
  }
}

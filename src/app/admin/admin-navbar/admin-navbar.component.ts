import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavbarItem } from 'src/app/header/models/navbar-item';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css'],
})
export class AdminNavbarComponent {
  @Input() navbarItems: NavbarItem[] = [
    { id: 1, isSelected: false, name: 'რეგიტრაცია', url: 'register' },
    { id: 2, isSelected: false, name: 'კატეგორიები', url: '' },
    { id: 3, isSelected: true, name: 'ექიმები', url: '' },
  ];
  @Output() select = new EventEmitter();

  onSelect(item: NavbarItem) {
    for (let navItem of this.navbarItems) {
      if (item.id === navItem.id) {
        navItem.isSelected = true;
      } else {
        navItem.isSelected = false;
      }
    }
    this.select.emit(item);
  }
}

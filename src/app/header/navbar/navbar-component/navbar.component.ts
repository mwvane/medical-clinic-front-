import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  data: any[] = [
    { id: 1, name: 'ექიმები' },
    { id: 2, name: 'კლინიკები'},
    { id: 3, name: 'ანოტაციები'},
    { id: 4, name: 'აქციები'},
    { id: 5, name: 'სერვისები'},
    { id: 6, name: 'მედიკამენტები'},
    { id: 7, name: 'კონტაქტი'},

  ];

  onSelect(id: number) {
    for (let item of this.data) {
      if (item.id === id) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
    }
  }
}

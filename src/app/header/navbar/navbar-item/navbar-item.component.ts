import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavbarItem } from '../../models/navbar-item';

@Component({
  selector: 'app-navbar-item',
  templateUrl: './navbar-item.component.html',
  styleUrls: ['./navbar-item.component.css'],
})
export class NavbarItemComponent {
  @Input() data: NavbarItem = { id: 1, name: '', isSelected: false , url: ""};
  @Output() select = new EventEmitter();

  onSelect() {
    this.select.emit(this.data);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavbarItem } from 'src/app/header/models/navbar-item';

@Component({
  selector: 'app-footer-item',
  templateUrl: './footer-item.component.html',
  styleUrls: ['./footer-item.component.css']
})
export class FooterItemComponent {
  @Input() footerItem: any
  @Output() select = new EventEmitter()

  onSelect(item: NavbarItem){
    this.select.emit(item)
  }
}

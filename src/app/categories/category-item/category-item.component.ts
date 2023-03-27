import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../models/category';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css'],
})
export class CategoryItemComponent {
  @Input() item: Category = { name: '', doctorCount: 0 , isSelected: false};
  @Output() open = new EventEmitter()

  onOpen(){
    this.item.isSelected = true
    this.open.emit(this.item)
  }
}

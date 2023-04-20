import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionMode } from 'src/app/auth/register/actionMode';
import { ModalService } from 'src/app/modals/modal.service';
import { Category } from '../models/category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-create-or-update-category',
  templateUrl: './create-or-update-category.component.html',
  styleUrls: ['./create-or-update-category.component.css'],
})
export class CreateOrUpdateCategoryComponent {
  @Input() category: Category = {
    name: '',
    id:0
  };

  @Output() result = new EventEmitter()

  constructor(
    public modalService: ModalService,
    private categoryServcice: CategoryService
  ) {}

  onClose() {
    this.modalService.craeteOrUpdateCategoryModal = false;
  }

  onSubmit() {
    if(!this.category.id){
      this.categoryServcice.addCategory(this.category).subscribe(data => {
        if(data.res){
          this.result.emit({...data.res})
          this.onClose()
        }
        else{
          alert(data.errors)
        }
      })
    }
    else{
      this.categoryServcice.updateCategory(this.category).subscribe(data => {
        if(data.res){
          this.result.emit({...this.category})
          this.onClose()
        }
        else{
          alert(data.errors)
          return data.errors
        }
      })
    }
  }

  get isNameValid() {
    if (this.category) {
      if (this.category.name.length >= 3) return true;
    }
    return false;
  }
}

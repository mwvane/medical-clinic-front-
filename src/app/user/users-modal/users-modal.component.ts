import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from 'src/app/modals/modal.service';

@Component({
  selector: 'app-users-modal',
  templateUrl: './users-modal.component.html',
  styleUrls: ['./users-modal.component.css']
})
export class UsersModalComponent {
  @Input() data: any[] = []
  @Output() booking = new EventEmitter()
  constructor(public modalService: ModalService){}
  onClose(){
    this.modalService.usersModal = false
  }
  
  onBooking(item: any){
    this.booking.emit(item)
    this.modalService.usersModal = false
  }
}

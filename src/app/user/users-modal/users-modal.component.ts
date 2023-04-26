import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from 'src/app/modals/modal.service';
import { UserRole } from '../userRole';

@Component({
  selector: 'app-users-modal',
  templateUrl: './users-modal.component.html',
  styleUrls: ['./users-modal.component.css'],
})
export class UsersModalComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() searchable: boolean = true;
  @Input() userMode: UserRole = UserRole.doctor;
  @Output() booking = new EventEmitter();
  @Output() close = new EventEmitter();
  @Input() searchResult: any[] = [];
  constructor(public modalService: ModalService) {}

  ngOnInit(): void {
    this.searchResult = this.data;
  }

  onClose() {
    this.modalService.usersModal = false;
    this.close.emit();
  }

  onBooking(item: any) {
    this.booking.emit(item);
    this.modalService.usersModal = false;
  }

  onSearch(e: any) {
    const text = e.target.value;
    if (text) {
      this.searchResult = this.searchResult.filter((item) =>
        item.firstname.toLowerCase().includes(text.toLowerCase())
      );
    } else {
      this.searchResult = this.data;
    }
  }
}

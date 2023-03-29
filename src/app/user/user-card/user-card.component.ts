import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Doctor } from '../models/doctor';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class DoctorCardComponent {
  @Input() vertical: boolean = true;
  @Input() footerActions: boolean = false;
  @Input() headerActions: boolean = false;
  @Input() rating: boolean = false;
  @Input() ratingReadOnly: boolean = false;
  @Input() details: boolean = false;
  @Input() experience: boolean = false;
  @Input() user: Doctor = {
    name: '',
    image: '',
    rating: 3,
    isPinned: false,
    category: ['ექიმი'],
    view: 0,
  };
  @Output() booking = new EventEmitter();
  @Output() pin = new EventEmitter();

  onPin() {
    this.user.isPinned = !this.user.isPinned;
    this.pin.emit(this.user.isPinned);
  }

  onBooking() {
    console.log('booking');
    this.booking.emit(this.user);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Doctor } from '../models/doctor';
import { User } from '../models/user';

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
  @Input() user: any
  @Output() booking = new EventEmitter();
  @Output() pin = new EventEmitter();

  get loading(){
   if(!this.user){
    return true
   }
   return false
  }

  onPin() {
    this.user.isPinned = !this.user.isPinned;
    this.pin.emit(this.user.isPinned);
  }

  onBooking() {
    this.booking.emit(this.user);
  }
}

import { Component, Input } from '@angular/core';
import { Doctor } from '../models/doctor';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class DoctorCardComponent {
  @Input() booking: boolean = false;
  @Input() headerActions: boolean = false;
  @Input() rating: boolean = false;
  @Input() details: boolean = false;
  @Input() user: Doctor = {
    name: '',
    rating: 3,
    isPinned: false,
    category: ['ექიმი'],
    view: 0,
  };

  onPin() {
    this.user.isPinned = !this.user.isPinned;
  }

  onBooking() {
    console.log('booking');
  }
}

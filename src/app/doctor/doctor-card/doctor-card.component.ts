import { Component, Input } from '@angular/core';
import { Doctor } from '../models/doctor';

@Component({
  selector: 'app-doctor-card',
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.css'],
})
export class DoctorCardComponent {
  @Input() booking:boolean = true
  @Input() details:boolean = false
  @Input() doctor: Doctor = {
    name: '',
    rating: 3,
    isPinned: false,
    category: ['ექიმი'],
    view: 0,
  };

  onPin() {
    this.doctor.isPinned = !this.doctor.isPinned;
  }

  onBooking() {
    console.log('booking');
  }
}

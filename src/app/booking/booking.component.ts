import { Component, OnInit } from '@angular/core';
import { Doctor } from '../user/models/doctor';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent {
  doctor: Doctor = {
    id: 2,
    firstname: 'ანა',
    lastname: 'დვალი',
    role: 'doctor',
    bookCount: 501,
    email: 'doctor@gmail.com',
    image: '',
    rating: 5,
    isPinned: false,
    category: ['კარდიოლოგი / არითმოლოგი'],
    views: 333,
  };
}

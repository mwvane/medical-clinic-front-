import { Component, OnInit } from '@angular/core';
import { Doctor } from '../user/models/doctor';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
 
  doctor: Doctor = {
    id: 2,
    name: 'ანა დვალი',
    image: '',
    rating: 5,
    isPinned: false,
    category: ['კარდიოლოგი / არითმოლოგი'],
    view: 333,
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}

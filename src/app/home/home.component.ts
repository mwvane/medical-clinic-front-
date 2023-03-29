import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '../user/models/doctor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  constructor(private router: Router){}

  doctors: Doctor[] = [
    {
      id: 1,
      name: 'გიორგი ხორავა',
      image: '',
      rating: 3,
      isPinned: true,
      category: ['ექიმი'],
      view: 4965,
    },
    {
      id: 2,
      name: 'ანა დვალი',
      image: '',
      rating: 5,
      isPinned: false,
      category: ['კარდიოლოგი / არითმოლოგი'],
      view: 333,
    },
    {
      id: 3,
      name: '',
      image: '',
      rating: 3,
      isPinned: false,
      category: ['ექიმი'],
      view: 495,
    },
    {
      id: 4,
      name: '',
      image: '',
      rating: 3,
      isPinned: false,
      category: ['ექიმი'],
      view: 496665,
    },
    {
      id: 5,
      name: '',
      image: '',
      rating: 3,
      isPinned: false,
      category: ['ექიმი'],
      view: 4,
    },
  ];

  onBooking(user: any){
    this.router.navigateByUrl("booking")
  }

  onPin(pinStatus:boolean){
    console.log(pinStatus)
  }
}

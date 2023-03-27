import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '../doctor/models/doctor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  doctors: Doctor[] = [
    {
      id: 1,
      name: 'გიორგი ხორავა',
      rating: 3,
      isPinned: true,
      category: ['ექიმი'],
      view: 4965,
    },
    {
      id: 2,
      name: 'ანა დვალი',
      rating: 5,
      isPinned: false,
      category: ['კარდიოლოგი / არითმოლოგი'],
      view: 333,
    },
    {
      id: 3,
      name: '',
      rating: 3,
      isPinned: false,
      category: ['ექიმი'],
      view: 495,
    },
    {
      id: 4,
      name: '',
      rating: 3,
      isPinned: false,
      category: ['ექიმი'],
      view: 496665,
    },
    {
      id: 5,
      name: '',
      rating: 3,
      isPinned: false,
      category: ['ექიმი'],
      view: 4,
    },
  ];
}

import { Component } from '@angular/core';
import { FooterItem } from '../models/footerItem';
import { NavbarItem } from 'src/app/header/models/navbar-item';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  footerItems: FooterItem[] = [
    {
      id: 1,
      caption: 'ინფორმაცია',
      items: [
        {
          id: 1,
          isSelected: false,
          name: 'ჩვენ შესახებ',
          url: '',
        },
        {
          id: 2,
          isSelected: false,
          name: 'პარტნიორები',
          url: '',
        },
        {
          id: 3,
          isSelected: false,
          name: 'ექიმებისთვის',
          url: '',
        },
        {
          id: 4,
          isSelected: false,
          name: 'კლინიკებისთვის',
          url: '',
        },
        {
          id: 5,
          isSelected: false,
          name: 'აფთიაქებისთვის',
          url: '',
        },
      ],
    },

    {
      id: 2,
      caption: 'პაციენტებისთვის',
      items: [
        {
          id: 1,
          isSelected: false,
          name: 'ექიმები',
          url: '',
        },
        {
          id: 2,
          isSelected: false,
          name: 'კლინიკები',
          url: '',
        },
        {
          id: 3,
          isSelected: false,
          name: 'ანოტაციები',
          url: '',
        },
        {
          id: 4,
          isSelected: false,
          name: 'ბლოგი',
          url: '',
        },
        {
          id: 5,
          isSelected: false,
          name: 'მედია',
          url: '',
        },
      ],
    },
    {
      id: 3,
      caption: 'კონტაქტი',
      items: [
        {
          id: 1,
          isSelected: false,
          name: 'სამუშაო დღეები : ორშ - პარ',
          url: '',
        },
        {
          id: 2,
          isSelected: false,
          name: 'სამუშაო დრო : 9:00 - 17:00',
          url: '',
        },
        {
          id: 3,
          isSelected: false,
          name: 'იაკობ ნიკოლაძე №10',
          url: '',
        },
        {
          id: 4,
          isSelected: false,
          name: '032 2 100 100',
          url: '',
        },
      ],
    },
    {
      id: 4,
      caption: 'გამოგვყევით',
      items: [
        {
          id: 1,
          isSelected: false,
          name: 'Facebook  ',
          url: '',
        },
        {
          id: 2,
          isSelected: false,
          name: 'Instagram',
          url: '',
        },
        {
          id: 3,
          isSelected: false,
          name: 'Youtube',
          url: '',
        },
      ],
    },
  ];

  onSelect(item: NavbarItem) {
    console.log(item);
  }
}

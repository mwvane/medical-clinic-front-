import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: any;
  ngOnInit(): void {
    this.user = {
      id: 1,
      name: 'levan bzishvili',
      email: 'bzishvili57@gmail.com',
      ID: "59001125643",
      role: 'client'
    };
  }
}

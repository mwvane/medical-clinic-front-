import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarItem } from 'src/app/header/models/navbar-item';
import { Doctor } from 'src/app/user/models/doctor';
import { DoctorService } from 'src/app/user/services/doctor.service';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  doctors: Doctor[] = [];
  selectedItem: any;

  constructor(
    private router: Router,
    private doctorService: DoctorService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.getDoctors(0).subscribe((data) => {
      if (data.res) {
        this.doctors = data.res;
      }
    });
  }

  onSelect(navItem: NavbarItem) {
    if (navItem.url) {
      this.router.navigateByUrl(navItem.url);
    }
  }

  editItem(item: any) {
    alert(item.firstname);
  }

  deleteItem(item: any) {
    this.userService.deleteUser(item.id).subscribe((data) => {
      if (data.res) {
      } else {
        alert(data.errors.join('\n'));
      }
    });
  }

  onRowSelect(item: any) {
    this.router.navigate(['userProfile/', item.data.id]);
  }
}

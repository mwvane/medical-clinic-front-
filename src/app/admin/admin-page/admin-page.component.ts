import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/models/user';
import { CategoryService } from 'src/app/categories/category.service';
import { Category } from 'src/app/categories/models/category';
import { NavbarItem } from 'src/app/header/models/navbar-item';
import { Doctor } from 'src/app/user/models/doctor';
import { DoctorService } from 'src/app/user/services/doctor.service';
import { UserService } from 'src/app/user/services/user.service';
import { UserRole } from 'src/app/user/userRole';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  doctors: Doctor[] = [];
  users: User[] = [];
  userTableFor = UserRole.doctor;
  categories: Category[] = [];
  selectedItem: any;
  selectedNavbarItem: any;

  constructor(
    private router: Router,
    private doctorService: DoctorService,
    private userService: UserService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadDoctors();
    this.loadcategories();
  }

  loadDoctors() {
    this.doctorService.getDoctors(0).subscribe((data) => {
      if (data.res) {
        this.doctors = data.res;
      }
    });
  }

  loadcategories() {
    this.categoryService.getCategories().subscribe((data) => {
      if (data.res) {
        this.categories = data.res;
      } else {
        console.log(data.errors);
      }
    });
  }

  onSelect(navItem: NavbarItem) {
    this.selectedNavbarItem = navItem;
    if (navItem.url) {
      this.router.navigateByUrl(navItem.url);
    }
  }

  get categoryOrID() {
    return this.userTableFor == UserRole.doctor
      ? 'category.name'
      : 'identityNumber';
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
    debugger
    this.router.navigate(['userProfile/', item.data.id, item.data.role]);
  }

  onAdmin() {
    this.userTableFor = UserRole.admin;
    this.userService.getUsersByRole(UserRole.admin).subscribe((data) => {
      if (data.res) {
        this.users = data.res;
      }
    });
  }

  onDoctor() {
    this.userTableFor = UserRole.doctor;
  }
  onClient() {
    this.userTableFor = UserRole.client;
    this.userService.getUsersByRole(UserRole.client).subscribe((data) => {
      if (data.res) {
        this.users = data.res;
      }
    });
  }

  onAddCategory() {
    alert();
  }
}

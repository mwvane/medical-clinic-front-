import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { User } from 'src/app/auth/models/user';
import { CategoryService } from 'src/app/categories/category.service';
import { Category } from 'src/app/categories/models/category';
import { NavbarItem } from 'src/app/header/models/navbar-item';
import { Helper } from 'src/app/helper';
import { ModalService } from 'src/app/modals/modal.service';
import { Doctor } from 'src/app/user/models/doctor';
import { DoctorService } from 'src/app/user/services/doctor.service';
import { UserService } from 'src/app/user/services/user.service';
import { UserRole } from 'src/app/user/userRole';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
  providers: [ConfirmationService],
})
export class AdminPageComponent implements OnInit {
  doctors: Doctor[] = [];
  users: User[] = [];
  userTableFor = UserRole.doctor;
  categories: Category[] = [];
  selectedItem: any;
  selectedNavbarItem: any;
  categoryForUpdate: Category = { name: '', id: 0 };

  constructor(
    private router: Router,
    private doctorService: DoctorService,
    private userService: UserService,
    private categoryService: CategoryService,
    private modalService: ModalService,
    private dialog: ConfirmationService
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

  get ratingOrEmail() {
    return this.userTableFor == UserRole.doctor ? 'rating' : 'email';
  }

  editItem(item: any) {
    this.router.navigate(['update', item.id, item.role]);
  }

  deleteItem(item: any) {
    this.dialog.confirm({
      message: 'ნამდვილად გსურთ მომხმარებლის წაშლა?',
      header: 'Delete',
      icon: 'pi pi-question',
      accept: () => {
        this.userService.deleteUser(item.id).subscribe((data) => {
          if (data.res) {
            if (item.role === UserRole.doctor) {
              this.doctors = this.doctors.filter(
                (doctor) => doctor.id !== item.id
              );
            } else {
              this.users = this.users.filter((user) => item.id !== user.id);
            }
          } else {
            alert(data.errors.join('\n'));
          }
        });
      },
    });
  }

  onRowSelect(item: any) {
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
    this.categoryForUpdate = { id: 0, name: '' };
    this.modalService.craeteOrUpdateCategoryModal = true;
  }

  onEditCategory(category: Category) {
    this.categoryForUpdate = category;
    this.modalService.craeteOrUpdateCategoryModal = true;
  }

  onDeleteCategory(category: Category) {
    this.dialog.confirm({
      message: `ნამდვილად გსურთ კატეგორია: ${category.name}-ის  წაშლა?`,
      header: 'Delete',
      icon: 'pi pi-question',
      accept: () => {
        this.categoryService.deleteCategory(category.id!).subscribe((data) => {
          if (data.res) {
            this.categories = this.categories.filter(
              (item) => item.id !== category.id
            );
          } else {
            alert(data.errors.join('\n'));
          }
        });
      },
    });
  }

  onCategoryChange(category: Category) {
    alert
    const index = Helper.getIndexById(category.id!, this.categories);
    if (index >= 0) {
      this.categories[index].name = category.name;
    } else {
      this.categories.unshift(category);
    }
  }

  getCopy(obj: any) {
    return { ...obj };
  }
}

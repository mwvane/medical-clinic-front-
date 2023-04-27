import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';
import { ModalService } from 'src/app/modals/modal.service';
import { Doctor } from 'src/app/user/models/doctor';
import { DoctorService } from 'src/app/user/services/doctor.service';
import { UserRole } from 'src/app/user/userRole';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ConfirmationService],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  showDoctrModal: boolean = false;
  searchedDoctors: Doctor[] = [];
  searchForm: FormGroup = new FormGroup({
    doctorName: new FormControl(),
    category: new FormControl(),
  });

  get loggedUser() {
    return this.authService.loggedUser;
  }

  constructor(
    private router: Router,
    private modalService: ModalService,
    private authService: AuthService,
    private dialog: ConfirmationService,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this.searchForm.patchValue({
      doctorName: '',
      category: '',
    });
  }

  onSearch() {
    this.doctorService.search(this.searchForm.value).subscribe((data) => {
      if (data.res) {
        this.searchedDoctors = data.res;
      }
      this.showDoctrModal = true;
      this.modalService.usersModal = true;
    });
  }
  onDoctorModalClose() {
    this.showDoctrModal = false;
  }

  onAvatar() {
    this.router.navigate([
      this.loggedUser.role === UserRole.admin ? 'admin/' : 'userProfile/',
      this.loggedUser.id,
    ]);
  }

  onLogin() {
    this.modalService.loginModal = true;
  }

  onHome() {
    this.router.navigateByUrl('home');
  }

  onBooking(user: any) {
    this.router.navigate(['booking/', user.id]);
    this.doctorService.increaseDeoctorView(user.id).subscribe((data) => {
      if (data.res) {
      } else {
      }
    });
  }

  get doctor() {
    return UserRole.doctor;
  }

  onLogout(e: any) {
    e.stopPropagation();
    this.dialog.confirm({
      message: 'ნამდვილად გსურთ გასვლა?',
      header: 'Logout',
      icon: 'pi pi-question',
      accept: () => {
        this.authService.logOut();
        this.router.navigateByUrl('home');
      },
    });
  }

  onSettings() {
    this.modalService.settingsModal = true;
  }
}

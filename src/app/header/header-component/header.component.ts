import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';
import { ModalService } from 'src/app/modals/modal.service';
import { UserRole } from 'src/app/user/userRole';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ConfirmationService],
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  get loggedUser() {
    return this.authService.loggedUser;
  }

  constructor(
    private router: Router,
    private modalService: ModalService,
    private authService: AuthService,
    private dialog: ConfirmationService
  ) {}

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
}

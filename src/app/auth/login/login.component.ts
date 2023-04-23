import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/modals/modal.service';
import { AuthService } from '../auth.service';
import { UserRole } from 'src/app/user/userRole';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @Input() openDialog: boolean = false;
  loginForm: any = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  verifyStatus: string = '';
  isTwoFactory: boolean = false;
  token: string = ""

  constructor(
    public modalaService: ModalService,
    private authService: AuthService,
    private router: Router
  ) {}

  onClose() {
    this.modalaService.loginModal = false;
  }

  onVerifyDone(email: string) {
    this.verifyStatus = 'done';
    this.saveUserAndNavigate(this.token)
  }

  onSubmit() {
    this.authService
      .login({
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      })
      .subscribe((data) => {
        debugger
        if (data.res) {
          this.authService.storeToken(data.res.token);
          if (this.authService.loggedUser.twoFactory === 'True') {
            this.authService.logOut();
            this.token = data.res.token
            this.isTwoFactory = true;
          } else {
            this.saveUserAndNavigate(data.res.token)
          }
        } else {
          alert(data.errors.join('\n'));
        }
      });
  }

  saveUserAndNavigate(token:string){
    debugger
    this.authService.storeToken(token);
    this.modalaService.loginModal = false;
    this.router.navigate([
      this.authService.loggedUser.role === UserRole.admin
        ? 'admin/'
        : 'userProfile/',
      this.authService.loggedUser.id,
    ]);
  }
}

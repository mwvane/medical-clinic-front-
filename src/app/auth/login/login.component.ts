import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/modals/modal.service';
import { AuthService } from '../auth.service';

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

  constructor(
    public modalaService: ModalService,
    private authService: AuthService,
    private router: Router
  ) {}

  onClose() {
    this.modalaService.loginModal = false;
  }

  onSubmit() {
    this.authService
      .login({
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      })
      .subscribe((data) => {
        if (data.res) {
          this.authService.storeToken(data.res.token);
          this.modalaService.loginModal = false;
          this.router.navigate([
            'userProfile/',
            this.authService.loggedUser.id,
          ]);
        } else {
          alert(data.errors.join('\n'));
        }
      });
  }
}

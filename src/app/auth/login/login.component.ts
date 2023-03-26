import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    private authService: AuthService
  ) {}

  onClose() {
    this.modalaService.loginModal = false;
  }

  onSubmit() {
    this.authService.login(this.loginForm).subscribe((data) => {
      if (data.res) {
        alert(data.res.firstname);
        this.modalaService.loginModal = false;
      } else {
        alert(data.errors.join('\n'));
      }
    });
  }
}

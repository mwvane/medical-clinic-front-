import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ModalService } from 'src/app/modals/modal.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  twoFactory: boolean = false;
  constructor(
    public modalService: ModalService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.loggedUser) {
      this.twoFactory = this.authService.loggedUser.twoFactory === 'True';
    }
  }

  onClose() {
    this.modalService.settingsModal = false;
  }
  onCangePassword() {
    this.modalService.forgetPasswordModal = true;
  }

  onTwoFactoryVahnge() {
    this.authService.twoFactory(this.twoFactory).subscribe((data) => {
      if (!data.res) {
        this.twoFactory = !this.twoFactory;
      } else {
        this.authService.storeToken(data.res.token);
        debugger;
        this.twoFactory = this.authService.loggedUser.twoFactory === 'True';
      }
    });
  }
}

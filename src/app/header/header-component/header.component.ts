import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/modals/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn: boolean = false

  constructor(private router: Router, private modalService: ModalService){}

  onAvatar(){
    console.log("clicked on avatar")
  }

  onLogin(){
    this.modalService.loginModal = true
  }

  onHome(){
    this.router.navigateByUrl("home");
  }
}

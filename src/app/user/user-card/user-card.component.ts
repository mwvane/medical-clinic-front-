import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Doctor } from '../models/doctor';
import { User } from '../models/user';
import { Pin } from '../models/pin';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class DoctorCardComponent {
  @Input() vertical: boolean = true;
  @Input() footerActions: boolean = false;
  @Input() headerActions: boolean = false;
  @Input() rating: boolean = false;
  @Input() ratingReadOnly: boolean = false;
  @Input() details: boolean = false;
  @Input() experience: boolean = false;
  @Input() user: any;
  @Output() booking = new EventEmitter();
  @Output() pin = new EventEmitter();
  @Output() forgetPassword = new EventEmitter();
  constructor(private authService: AuthService) {}

  get loading() {
    if (!this.user) {
      return true;
    }
    return false;
  }

  onForgetPassword() {
    this.forgetPassword.emit();
  }

  onPin() {
    if (this.authService.loggedUser) {
      const pin: Pin = {
        doctorId: this.user.id,
        userId: this.authService.loggedUser.id,
        isPinned: !this.isUserPinned,
        pinDate: new Date(),
      };
      this.user.pin = pin;
      this.pin.emit(pin);
    }
  }

  get isUserPinned() {
    if (this.user.pin && this.user.pin.isPinned) {
      return true;
    }
    return false;
  }

  onBooking() {
    this.booking.emit(this.user);
  }
}

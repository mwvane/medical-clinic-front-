import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalService } from 'src/app/modals/modal.service';
import { Validations } from '../validations';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent {
  verificationStatus: string = '';
  isPasswordTouched = false;

  form: FormGroup = new FormGroup({
    newPassword: new FormControl(),
    confirmPassword: new FormControl(),
    email: new FormControl()
  });

  constructor(
    public modalService: ModalService,
    private authService: AuthService
  ) {}

  onClose() {}

  onSubmit() {
    this.authService
      .changePassword(
        this.form.value.email,
        this.form.value.newPassword,
        this.form.value.confirmPassword
      )
      .subscribe((data) => {
        debugger
        if (data.res) {
          alert('Password changed');
          this.modalService.forgetPasswordModal = false;
        } else {
          alert(data.errors.join('\n'));
        }
      });
  }

  onVerifyDone(email: string) {
    this.verificationStatus = 'done';
    this.form.patchValue({
      email,
    });
    debugger
  }

  get isPasswordValid() {
    let field = this.form.controls['newPassword'];
    if (field.touched) {
      this.isPasswordTouched = true;
      const valid = Validations.isPasswordValid(field.value);
      if (valid === true) {
        field.setErrors(null);
      } else {
        field.setErrors({ incorrect: true });
      }
      return valid;
    }
    return true;
  }

  get isConfirmPasswordMach() {
    let field = this.form.controls['confirmPassword'];
    const password = this.form.value.newPassword;
    const confirmPassword = this.form.value.confirmPassword;
    if (password === confirmPassword) {
      field.setErrors(null);
    } else {
      field.setErrors({ incorrect: true });
    }
    return password === confirmPassword;
  }

  get isEmailValid() {
    let field = this.form.controls['email'];
    const valid = Validations.isEmailValid(field.value);
    if (!valid) {
      field.setErrors({ incorrect: true });
    } else {
      field.setErrors(null);
    }
    return valid;
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalService } from 'src/app/modals/modal.service';
import { Validations } from '../validations';
import { Result } from 'src/app/models/result';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
  providers: [MessageService],
})
export class ForgetPasswordComponent {
  isCodeSent: boolean = false;
  canSentMail: boolean = true;
  verificationStatusIcon: string = 'pi pi-check';
  verificationStatus: string = '';
  isPasswordTouched = false;

  emailVerifyStatus: Result = {};

  form: FormGroup = new FormGroup({
    email: new FormControl(),
    code: new FormControl(),
    newPassword: new FormControl(),
    confirmPassword: new FormControl(),
  });

  constructor(
    public modalService: ModalService,
    private messageService: MessageService,
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
        if (data.res) {
          alert('Password changed');
          this.modalService.forgetPasswordModal = false;
        } else {
          alert(data.errors.join('\n'));
        }
      });
  }

  onEmail() {
    const emailTo = this.form.value.email;
    if (Validations.isEmailValid(emailTo)) {
      this.authService.sendEmail(emailTo).subscribe((data) => {
        debugger;
        if (data) {
          this.messageService.add({
            severity: 'success',
            summary: 'Email',
            detail: 'იმეილი გაიგზავნა წარმატებით',
            life: 3000,
          });
          this.isCodeSent = true;
          this.canSentMail = false;
        }
      });
    }
  }

  onVerification() {
    if (!this.verificationStatus) {
      this.verificationStatus = 'loading';
      this.verificationStatusIcon = 'pi pi pi-check';
      this.authService
        .confirmEmail({
          email: this.form.value.email,
          code: this.form.value.code,
        })
        .subscribe((data) => {
          this.emailVerifyStatus = data;
          if (data.res) {
            this.verificationStatus = 'done';
            this.verificationStatusIcon = 'pi pi-check-circle';
          } else {
            this.verificationStatus = '';
            this.verificationStatusIcon = 'pi pi-check';
          }
        });
    }
  }

  get emailVerifyValidation() {
    let field = this.form.controls['code'];
    if (field.touched) {
      if (this.emailVerifyStatus) {
        if (this.emailVerifyStatus.res) {
          field.setErrors(null);
          return true;
        } else {
          field.setErrors({ incorect: true });
          return this.emailVerifyStatus.errors;
        }
      }
    }
    return true;
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

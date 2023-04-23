import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validations } from '../validations';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/api';
import { Result } from 'src/app/models/result';
import { Constants } from 'src/app/constants';

@Component({
  selector: 'app-email-onfirm',
  templateUrl: './email-onfirm.component.html',
  styleUrls: ['./email-onfirm.component.css'],
  providers: [MessageService],
})
export class EmailOnfirmComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl(),
    code: new FormControl(),
  });
  isCodeSent: boolean = false;
  canSentMail: boolean = true;
  verificationStatusIcon: string = 'pi pi-check';
  verificationStatus: string = '';
  emailVerifyStatus: Result = {};
  emailTic = Constants.EMAIL_RESEND_DURATION;

  @Output() done = new EventEmitter();

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  onEmail() {
    const emailTo = this.form.value.email;
    if (Validations.isEmailValid(emailTo)) {
      this.authService.sendEmail(emailTo).subscribe((data) => {
        if (data) {
          this.emailTimeout();
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

  emailTimeout() {
    let timeOut = setInterval(() => {
      this.emailTic--;
      if (this.emailTic === 0) {
        clearTimeout(timeOut);
        this.canSentMail = true;
        this.emailTic = Constants.EMAIL_RESEND_DURATION;
      }
    }, 1000);
  }

  onSubmit() {}

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
            this.done.emit(this.form.value.email);
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
}

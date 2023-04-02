import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';
import { Validations } from '../validations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService],
})
export class RegisterComponent {
  registerForm: any = new FormGroup({
    firstname: new FormControl(null, [Validators.minLength(5)]),
    email: new FormControl(),
    ID: new FormControl(),
    lastname: new FormControl(),
    code: new FormControl(),
    password: new FormControl(),
  });

  isEmailTouched: boolean = false;
  isNameTouched: boolean = false;
  isPasswordTouched: boolean = false;
  isIDTouched: boolean = false;

  isFormValidErrors: boolean = true;
  verificationStatus: string = '';
  verificationStatusIcon: string = 'pi pi-check';

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  onSubmit() {
    this.authService.register(this.registerForm).subscribe((data) => {
      if (data.res) {
        this.authService
          .login({ username: data.res.email, password: data.res.password })
          .subscribe((data) => {
            this.authService.storeToken(data.res.token);
            this.router.navigate([
              'userProfile/',
              this.authService.loggedUser.id,
            ]);
          });
      } else {
        alert(data.errors.join('\n'));
      }
    });
  }

  onEmail() {
    const emailTo = this.registerForm.value.email;
    if (Validations.isEmailValid(emailTo)) {
      this.messageService.add({
        severity: 'success',
        summary: 'Email',
        detail: 'იმეილი გაიგზავნა წარმატებით',
        life: 3000,
      });
      this.authService.sendEmail(emailTo).subscribe((data) => {});
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Email',
        detail: "არასწორი ფორმატი",
        life: 3000,
      });
    }
  }

  onVerification() {
    if (!this.verificationStatus) {
      this.verificationStatus = 'loading';
      this.verificationStatusIcon = 'pi pi pi-check';
      this.authService
        .confirmEmail({
          email: this.registerForm.value.email,
          code: this.registerForm.value.code,
        })
        .subscribe((data) => {
          console.log(data.res);
          if (data.res) {
            this.verificationStatus = 'done';
            this.verificationStatusIcon = 'pi pi-check-circle';
          } else {
            this.verificationStatus = '';
            this.verificationStatusIcon = 'pi pi-check-circle';
          }
        });
    }
  }

  get firstnameValidation() {
    return this.registerForm.get('firstname');
  }

  get isEmailValid() {
    let field = this.registerForm.controls['email'];
    if (field.touched) {
      this.isEmailTouched = true;
      const valid = Validations.isEmailValid(field.value);
      if (!valid) {
        field.setErrors({ incorrect: true });
      } else {
        field.setErrors(null);
      }
      return valid;
    }
    return true;
  }

  get isIdentityNumberValid() {
    let field = this.registerForm.controls['ID'];
    if (!field.pristine) {
      this.isIDTouched = true;
      const valid = Validations.isIdentityNumberValid(field.value);
      if (!valid) {
        field.setErrors({ incorrect: true });
      } else {
        field.setErrors(null);
      }
      return valid;
    }
    return true;
  }

  get isPasswordValid() {
    let field = this.registerForm.controls['password'];
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

  get isFormValid() {
    if (!this.isEmailTouched || !this.isIDTouched || !this.isPasswordTouched) {
      return false;
    }
    if (!this.registerForm.valid) {
      return false;
    }
    return true;
  }
}

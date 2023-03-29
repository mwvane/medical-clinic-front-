import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Validations } from '../validations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
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

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.register(this.registerForm).subscribe((data) => {
      console.log(data.res);
    });
  }

  onEmail() {
    const emailTo = this.registerForm.value.email;
    if (Validations.isEmailValid(emailTo)) {
      this.authService.sendEmail(emailTo).subscribe((data) => {
        console.log(data);
      });
    } else {
      alert('email is invalid');
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

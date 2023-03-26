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
    email: new FormControl(null, [Validators.email, Validators.required]),
    ID: new FormControl(null, [Validators.minLength(11)]),
    lastname: new FormControl(),
    code: new FormControl(),
    password: new FormControl(),
  });

  isFormValid: boolean = true;

  constructor(private authService: AuthService) {}
  onSubmit() {
    console.log(this.registerForm.value);
    this.authService.register(this.registerForm).subscribe((data) => {
      console.log(data.res);
    });
  }

  get firstnameValidation() {
    return this.registerForm.get('firstname');
  }

  get isEmailValid() {
    let valid = Validations.isEmailValid(this.registerForm.value.email);

    return valid;
  }

  get isIdentityNumberValid() {
    const valid = Validations.isIdentityNumberValid(this.registerForm.value.ID);
    return valid;
  }

  get isPasswordValid() {
    const valid = Validations.isPasswordValid(this.registerForm.value.password);
    return valid;
  }
}

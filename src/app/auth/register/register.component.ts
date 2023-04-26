import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';
import { Validations } from '../validations';
import { Result } from 'src/app/models/result';
import { UserRole } from 'src/app/user/userRole';
import { UserService } from 'src/app/user/services/user.service';
import { ActionMode } from './actionMode';
import { Category } from 'src/app/categories/models/category';
import { CategoryService } from 'src/app/categories/category.service';
import { DoctorService } from 'src/app/user/services/doctor.service';
import { FileType } from 'src/app/upload-file/enum/fileType';
import { FileService } from 'src/app/upload-file/file.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    firstname: new FormControl(null, [Validators.minLength(5)]),
    email: new FormControl(),
    identityNumber: new FormControl(),
    lastname: new FormControl(),
    code: new FormControl(),
    password: new FormControl(),
    imageUrl: new FormControl(),
    role: new FormControl(),
    categoryId: new FormControl(),
    id: new FormControl(),
  });

  user: any;

  roles = [UserRole.client, UserRole.doctor, UserRole.admin];
  defaultRole = this.roles[0];

  isEmailTouched: boolean = false;
  isNameTouched: boolean = false;
  isPasswordTouched: boolean = false;
  isIDTouched: boolean = false;
  isEmailConfirmTouched: boolean = false;

  isFormValidErrors: boolean = true;
  verificationStatus: string = '';
  verificationStatusIcon: string = 'pi pi-check';
  emailVerifyStatus: Result = {};

  loggedUser: any;
  role = UserRole.client;
  action = ActionMode.register;
  disabaled = true;
  categories: Category[] = [];
  selectedUser:any
  selectedImage: any;
  selectedDocument: any;

  @ViewChild('roleSelector') roleSelector: any;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private userService: UserService,
    private doctorService: DoctorService,
    private messageService: MessageService,
    private categoriService: CategoryService,
    private fileService: FileService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loggedUser = this.authService.loggedUser;
    this.role = this.loggedUser.role;
    if (this.loggedUser && this.loggedUser.role === UserRole.admin) {
      this.loadCategories();
    }
    this.route.params.subscribe((params) => {
      const id = params['id'];
      const role = params['role'];
      if (id) {
        this.action = ActionMode.update;
        if (role == UserRole.doctor) {
          this.doctorService.getDoctors(id).subscribe((data) => {
            if (data.res) {
              this.registerForm.patchValue(data.res);
              this.selectedUser = data.res
            }
          });
        }

        this.userService.getUser(id).subscribe((data) => {
          if (data.res) {
            this.registerForm.patchValue(data.res);
          }
        });
      }
    });
  }

  findCategory(id: number) {
    return this.categories.find((item) => item.id === id);
  }

  loadCategories() {
    this.categoriService.getCategories().subscribe((data) => {
      if (data.res) {
        this.categories = data.res;
      }
    });
  }

  onSelectImage(file: File) {
    this.selectedImage = file;
  }

  onSelectDocument(file: File) {
    this.selectedDocument = file;
  }

  onSubmit() {
    if (this.action === ActionMode.update) {
      this.registerForm.value.identityNumber = String(
        this.registerForm.value.identityNumber
      );
      this.registerForm.patchValue({categoryId: this.selectedUser.category.id})
      this.userService.editUser(this.registerForm.value).subscribe((data) => {
        if (data.res) {
          if (this.selectedDocument) {
            this.uploadDocument(this.registerForm.value.id);
          }
          if (this.selectedImage) {
            this.uploadPhoto(this.registerForm.value.id);
          }
          this.location.back()
        } else {
          alert(data.errors.join('\n'));
        }
      });
    }
    if (this.action === ActionMode.register) {
      this.authService.register(this.registerForm).subscribe((data) => {
        if (data.res) {
          if (this.selectedDocument) {
            this.uploadDocument(data.res.id);
          }
          if (this.selectedImage) {
            this.uploadPhoto(data.res.id);
          }

          if (!this.loggedUser) {
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
            this.location.back();
          }
        } else {
          alert(data.errors.join('\n'));
        }
      });
    }
  }

  uploadPhoto(userId: number) {
    this.fileService
      .uploadImage({ userId, file: this.selectedImage })
      .subscribe((data) => {});
  }
  uploadDocument(userId: number) {
    this.fileService
      .uploadDocument({
        userId,
        file: this.selectedDocument,
      })
      .subscribe((data) => {});
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
        detail: 'არასწორი ფორმატი',
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

  get showEmailVerificationField() {
    if (
      this.authService.loggedUser &&
      this.authService.loggedUser.role === UserRole.admin
    ) {
      return false;
    }
    return true;
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
    let field = this.registerForm.controls['identityNumber'];
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

  get emailVerifyValidation() {
    let field = this.registerForm.controls['code'];
    if (field.touched) {
      this.isEmailConfirmTouched = true;
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

  get getSelectedRole() {
    const role = this.registerForm.value.role;
    return role;
  }

  get isFormValid() {
    if (
      this.action === ActionMode.update &&
      this.registerForm.touched &&
      this.registerForm.valid
    ) {
      return true;
    }
    if (
      !this.isEmailTouched ||
      !this.isIDTouched ||
      !this.isPasswordTouched ||
      !this.isEmailConfirmTouched
    ) {
      return false;
    }
    return true;
  }

  get documentType() {
    return FileType.Pdf;
  }
}

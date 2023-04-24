import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header-component/header.component';
import { NavbarComponent } from './header/navbar/navbar-component/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LanguageSelectorComponent } from './header/language-selector/language-selector.component';
import { NavbarItemComponent } from './header/navbar/navbar-item/navbar-item.component';
import { ButtonModule } from 'primeng/button';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { DialogModule } from 'primeng/dialog';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories/categories.component';
import { CategoryItemComponent } from './categories/category-item/category-item.component';
import { AvatarComponent } from './avatar/avatar.component';
import { RatingModule } from 'primeng/rating';
import { DoctorCardComponent } from './user/user-card/user-card.component';
import { BookingComponent } from './booking/booking.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TokenInterceptor } from './ingterceptors/token.interceptor';
import { ToastModule } from 'primeng/toast';
import { CalendarComponent } from './calendar-component/calendar/calendar.component';
import { CalendarItemComponent } from './calendar-component/calendar-item/calendar-item.component';
import { SkeletonModule } from 'primeng/skeleton';
import { UserCardSkeletonComponent } from './user/user-card-skeleton/user-card-skeleton.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TooltipModule } from 'primeng/tooltip';
import { FooterComponent } from './footer-component/footer/footer.component';
import { FooterItemComponent } from './footer-component/footer-item/footer-item.component';
import { DropdownModule } from 'primeng/dropdown';
import { AdminNavbarComponent } from './admin/admin-navbar/admin-navbar.component';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { TableModule } from 'primeng/table';
import { AvatarModule } from 'primeng/avatar';
import { CreateOrUpdateCategoryComponent } from './categories/create-or-update-category/create-or-update-category.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { SettingsComponent } from './header/settings/settings.component';
import { CheckboxModule } from 'primeng/checkbox'; 
import { InputSwitchModule } from 'primeng/inputswitch';
import { EmailOnfirmComponent } from './auth/email-onfirm/email-onfirm.component';
import { UsersModalComponent } from './user/users-modal/users-modal.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { ChipModule } from 'primeng/chip';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    LanguageSelectorComponent,
    NavbarItemComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    CategoriesComponent,
    CategoryItemComponent,
    AvatarComponent,
    DoctorCardComponent,
    BookingComponent,
    UserProfileComponent,
    CalendarComponent,
    CalendarItemComponent,
    UserCardSkeletonComponent,
    FooterComponent,
    FooterItemComponent,
    AdminNavbarComponent,
    AdminPageComponent,
    CreateOrUpdateCategoryComponent,
    ForgetPasswordComponent,
    SettingsComponent,
    EmailOnfirmComponent,
    UsersModalComponent,
    UploadFileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    RatingModule,
    ConfirmDialogModule,
    ToastModule,
    SkeletonModule,
    ConfirmPopupModule,
    TooltipModule,
    DropdownModule,
    TableModule,
    AvatarModule,
    CheckboxModule,
    InputSwitchModule,
    ChipModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

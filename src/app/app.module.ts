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
// import { ToastModule } from 'primeng/toast';

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
    ConfirmDialogModule
    // ToastModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent],
})
export class AppModule {}

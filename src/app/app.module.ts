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
import { DoctorCardComponent } from './doctor/doctor-card/doctor-card.component';
import { RatingModule } from 'primeng/rating';
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
    // ToastModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

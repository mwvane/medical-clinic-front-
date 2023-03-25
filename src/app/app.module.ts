import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header-component/header.component';
import { NavbarComponent } from './header/navbar/navbar-component/navbar.component';
import { LanguageSelectorComponent } from './header/language-selector/language-selector.component';
import { NavbarItemComponent } from './header/navbar/navbar-item/navbar-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    LanguageSelectorComponent,
    NavbarItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

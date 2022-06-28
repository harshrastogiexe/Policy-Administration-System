import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputTextComponent } from './input-text/input-text.component';
import { SignupComponent } from './pages/signup/signup.component';

@NgModule({
  declarations: [AppComponent, InputTextComponent, SignupComponent],
  imports: [CommonModule, BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

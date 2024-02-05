import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';

import { ButtonModule } from 'primeng/button';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './Component/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

import { MessageService } from 'primeng/api';
import { AuthService } from './Service/auth.service';
@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    DividerModule,
    ButtonModule,
    ReactiveFormsModule,
    ToastModule
  ],
  providers: [MessageService,AuthService]
})
export class AuthModule { }

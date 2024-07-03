import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LoginComponent,
    CreateAccountComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule { }

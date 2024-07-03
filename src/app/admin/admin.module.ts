import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdministrationAccountsComponent } from './administration-accounts/administration-accounts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AdministrationAccountsComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule { }

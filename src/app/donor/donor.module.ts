import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonorRoutingModule } from './donor-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DonationsAdministrationComponent } from './donations-administration/donations-administration.component';
import { SharedModule } from '../shared/shared.module';
import { PostModule } from '../post/post.module';


@NgModule({
  declarations: [
    DashboardComponent,
    DonationsAdministrationComponent
  ],
  imports: [
    CommonModule,
    DonorRoutingModule,
    SharedModule,
    PostModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DonorModule { }

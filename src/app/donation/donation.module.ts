import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonationRoutingModule } from './donation-routing.module';
import { DonationFormComponent } from './donation-form/donation-form.component';
import { SharedModule } from '../shared/shared.module';
import { ListDonationComponent } from './list-donation/list-donation.component';
import { PostModule } from '../post/post.module';


@NgModule({
  declarations: [
    DonationFormComponent,
    ListDonationComponent
  ],
  imports: [
    CommonModule,
    DonationRoutingModule,
    SharedModule,
    PostModule
  ]
})
export class DonationModule { }

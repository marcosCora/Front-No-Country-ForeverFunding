import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../donor/dashboard/dashboard.component';
import { DonationFormComponent } from './donation-form/donation-form.component';
import { authDonorGuard } from '../core/guards/donor/donor.guard';
import { ListDonationComponent } from './list-donation/list-donation.component';

const routes: Routes = [
  {
    path: 'new-donation', component: DonationFormComponent
  },
  
  {
    path: 'list-donations', component: ListDonationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonationRoutingModule { }

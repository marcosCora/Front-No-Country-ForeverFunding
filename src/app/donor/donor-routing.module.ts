import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DonationsAdministrationComponent } from './donations-administration/donations-administration.component';
import { UserInfoComponent } from '../shared/user-components/user-info/user-info.component';
import { ViewPostsComponent } from '../shared/user-components/view-posts/view-posts.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'posts',
    pathMatch: 'full'
  },
  
  {
    path: 'posts', component: ViewPostsComponent,
  },

  {
    path: 'dashboard', component: DashboardComponent 
  },
  
  {
    path: 'donations-administration', component:DonationsAdministrationComponent
  },

  {
    path: 'userinfo', component: UserInfoComponent
  },

  { 
    path: '**', redirectTo:'posts', pathMatch:'full' 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonorRoutingModule { }

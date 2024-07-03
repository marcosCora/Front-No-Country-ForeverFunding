import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './shared/components/home/home-page.component';
import { authAdminGuard } from './core/guards/admin/admin.guard';
import { authCreatorGuard } from './core/guards/creator/creator.guard';
import { authDonorGuard } from './core/guards/donor/donor.guard';
import { UserInfoComponent } from './shared/user-components/user-info/user-info.component';
import { ViewPostsComponent } from './shared/user-components/view-posts/view-posts.component';

const routes: Routes = [

  {
    path: '', redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home', component: HomePageComponent 
  },

  {
    path: 'auth', loadChildren: ()=> import('./auth/auth.module').then(m=>m.AuthModule)
  },

  { 
    path: 'post', loadChildren: () => import('./post/post.module').then(m=>m.PostModule)
  },

  { 
    path: 'donation', loadChildren: () => import('./donation/donation.module').then(m=>m.DonationModule)
  },

  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [authAdminGuard]
  },

  {
    path: 'creator', loadChildren: () => import('./creator/creator.module').then(m => m.CreatorModule), canActivate: [authCreatorGuard]
  },

  {
    path: 'donor', loadChildren: () => import('./donor/donor.module').then(m => m.DonorModule), canActivate: [authDonorGuard]
  },

  { 
    path: '**', redirectTo:'home', pathMatch:'full' 
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

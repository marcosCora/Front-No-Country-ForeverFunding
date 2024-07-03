import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },

  {
    path: 'login', component: LoginComponent
  },
  
  {
    path: 'createAccount', component: CreateAccountComponent
  },

  { 
    path: '**', redirectTo:'login', pathMatch:'full' 
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

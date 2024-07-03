import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatorRoutingModule } from './creator-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdministrationPostComponent } from './administration-post/administration-post.component';
import { SharedModule } from '../shared/shared.module';
import { ListPostComponent } from '../post/list-post/list-post.component';
import { PostModule } from '../post/post.module';


@NgModule({
  declarations: [
    DashboardComponent,
    AdministrationPostComponent
  ],
  imports: [
    CommonModule,
    CreatorRoutingModule,
    SharedModule
  ]
})
export class CreatorModule { }

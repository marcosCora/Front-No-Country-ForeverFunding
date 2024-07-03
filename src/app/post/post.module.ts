import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { ListPostComponent } from './list-post/list-post.component';
import { PostFormComponent } from './post-form/post-form.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { ViewPostsComponent } from './view-posts/view-posts.component';
import { SharedModule } from '../shared/shared.module';
import { PostDetailComponent } from './post-detail/post-detail.component';


@NgModule({
  declarations: [
    ListPostComponent,
    PostFormComponent,
    UpdatePostComponent,
    PostDetailComponent,
    ViewPostsComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    SharedModule
  ]
})
export class PostModule { }

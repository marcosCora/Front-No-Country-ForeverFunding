import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPostComponent } from './list-post/list-post.component';
import { PostFormComponent } from './post-form/post-form.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { ViewPostsComponent } from './view-posts/view-posts.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { authCreatorGuard } from '../core/guards/creator/creator.guard';

const routes: Routes = [

    //VER PUBLICACIONES HECHAS POR EL USUARIO
    { 
      path: 'post-creator', component: ListPostComponent, canActivate: [authCreatorGuard] 
    },

    //CREAR NUEVA PUBLICACION
    { 
      path: 'new-post', component: PostFormComponent, canActivate: [authCreatorGuard] 
    },
   
    //VER PUBLICACIONES POR ID (EDITAR Y ELIMINAR)
    { 
      path: 'update-post/:id', component: UpdatePostComponent, canActivate: [authCreatorGuard]
    },

    //VER PUBLICACIONES GENERALES
    {
      path: 'viewPosts', component: ViewPostsComponent
    },

    {
      path: 'detail/:id', component: PostDetailComponent
    }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }

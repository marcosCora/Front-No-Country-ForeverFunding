import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarUserComponent } from './user-components/navbar-user/navbar-user.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { UserInfoComponent } from './user-components/user-info/user-info.component';

import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';

import { MatTooltipModule } from '@angular/material/tooltip';
import { ViewPostsComponent } from './user-components/view-posts/view-posts.component';
import { NgxPaginationModule } from 'ngx-pagination';


//Angular Material
import {MatTabsModule} from '@angular/material/tabs';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    NavbarUserComponent,
    HeaderComponent,
    FooterComponent,
    UserInfoComponent,
    ViewPostsComponent
  ],

  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatTabsModule,
    MatPaginatorModule,
    MatTableModule,
    NgxPaginationModule,
    MatFormFieldModule

  ],

  exports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    NavbarUserComponent,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    UserInfoComponent,
    UserInfoComponent,
    MatTooltipModule,
    ViewPostsComponent,
    MatTabsModule,
    MatPaginatorModule,
    MatTableModule,
    NgxPaginationModule,
    MatFormFieldModule

  ]
})
export class SharedModule { }

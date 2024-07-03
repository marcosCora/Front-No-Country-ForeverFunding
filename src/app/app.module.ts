import {CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomePageComponent } from './shared/components/home/home-page.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { SharedModule } from './shared/shared.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

//Import Components

import { HttpClientModule } from '@angular/common/http';
import { environment } from './environments/environment.prod';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FirebaseAppModule} from '@angular/fire/app';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatGridListModule,
    SharedModule,
    ToastrModule.forRoot(),
    MatButtonToggleModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule, 
    FirebaseAppModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { LablesRekamanListComponent } from './lablesRekaman/lablesRekamanlist.component';
import { LablesRekamanComponent } from './lablesRekaman/lablesRekaman.component';
import { ArtisComponent } from './artis/artis.component';
import { ArtisListComponent } from './artis/artislist.component';
import { GenreComponent } from './genre/genre.component';
import { GenreListComponent } from './genre/genrelist.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumsListComponent } from './albums/albumslist.component';
import { LaguComponent } from './lagu/lagu.component';
import { LaguListComponent } from './lagu/lagulist.component';
import { AuthService } from './auth.service';
import { AuthGuardService } from './authGuard.service';
import { LoginComponent } from './login/login.component';
import { AkunAdminComponent } from './akunAdmin/akunAdmin.component';
import { UserManajemenComponent } from './userManajemen/userManajemen.component';
import { UserManajemenListComponent } from './userManajemen/userManajemenlist.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LablesRekamanComponent,
    LablesRekamanListComponent,
    ArtisComponent,
    ArtisListComponent,
    GenreComponent,
    GenreListComponent,
    AlbumsComponent,
    AlbumsListComponent,
    LaguComponent,
    LaguListComponent,
    LoginComponent,
    AkunAdminComponent,
    UserManajemenComponent,
    UserManajemenListComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }

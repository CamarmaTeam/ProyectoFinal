import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatInputModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatCheckboxModule, MatSelectModule, MatCardModule, MatMenuModule, MatRadioModule } from '@angular/material/';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { PSelectComponent } from './p-select/p-select.component';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent, 
    FooterComponent, LogInComponent, SignInComponent, PSelectComponent, PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatCardModule,
    MatMenuModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

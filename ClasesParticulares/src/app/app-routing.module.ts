import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'home'},
	{ path: 'home' , component: HomeComponent },
	{ path: 'signin' , component: SignInComponent },
	{ path: 'login' , component: LogInComponent },
	{ path: 'perfil' , component: PerfilComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

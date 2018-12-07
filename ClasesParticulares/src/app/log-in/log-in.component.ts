import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ApiService } from '../api.service';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-log-in',
	templateUrl: './log-in.component.html',
	styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
	
	formLogIn: FormGroup;
	hide: boolean ;
	eye: string;
	tipoUsuario: string;
	error : boolean;
	
	constructor(private apiService: ApiService, private loginService: LoginService, private router : Router) {
		this.formLogIn = new FormGroup({
			email: new FormControl('', [
				Validators.required,
				Validators.email
				]),
			contrasena: new FormControl('',[
				Validators.required
				])
		})
		this.hide = true;
		this.eye = ' grey eye icon';
		this.tipoUsuario = 'alumno'
	}

	ngOnInit() {
	}
	getErrorMessage() {
		return this.formLogIn.controls.email.hasError('required') ? 'Debes introducir un email' :
		this.formLogIn.controls.email.hasError('email') ? 'Email invalido' :
		'';
	}
	handleClick(){
		this.eye = 'grey eye icon';
		this.hide = !this.hide;
		(this.hide) ? this.eye : this.eye=' eye slash icon'
	}

	envioFormulario(){
		if(this.tipoUsuario == 'alumno'){
			this.apiService.postLoginUsuario(this.formLogIn.value).then((res) => {
				if(res.json().error){
					this.error = true
				}else{
					localStorage.setItem("token",res.json().token);	
					this.loginService.isLogin()
					this.router.navigate(['/home'])
					this.error = false
				}
				
			})						
		}else{
			this.apiService.postLoginProfesor(this.formLogIn.value).then((res) => {
				localStorage.setItem("token",res.json().token);	
				this.loginService.isLogin()
				this.router.navigate(['/perfil'])			
			})	
		}
	}

	handleClickInicio($event){
		this.tipoUsuario = $event.currentTarget.id;
	}
}

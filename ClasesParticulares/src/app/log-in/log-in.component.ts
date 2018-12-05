import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ApiService } from '../api.service';

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


	
	
	constructor(private apiService: ApiService) {
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
				res.json()
				console.log(res.json())
			})
			console.log(this.formLogIn.value)
			console.log('inicio sesion usuario')
		}else{
			this.apiService.postLoginProfsor(this.formLogIn.value).then((res) => {

			})
			console.log('inicio sesión profesor')
		}
	}

	handleClickInicio($event){
		this.tipoUsuario = $event.currentTarget.id;
	}
}

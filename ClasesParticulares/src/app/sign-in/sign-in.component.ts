import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import Pselect from 'pselect.js';
 

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

	checked: boolean;	
	hide: boolean;

	formRegistro: FormGroup;
	constructor() {
		this.formRegistro = new FormGroup({
			nombre: new FormControl('',[
				Validators.required,
				Validators.maxLength(25),
				]),
			apellidos: new FormControl('',[
				Validators.required,
				Validators.maxLength(40),
				]),
			email: new FormControl('', [
				Validators.required,
				Validators.email
				]),
			password: new FormControl('',[
				Validators.required
				]),
			passwordConfirm: new FormControl('',[
				Validators.required
				]),
			telefono: new FormControl('',[
				Validators.required
				]) 
		}, {validators: [this.validarPassword]})
		this.checked = false;
		this.hide = true;
	}
	ngOnInit() {
	}
	envioRegistro(){

	}
	mensajeErrorEmail() {
		return this.formRegistro.controls.email.hasError('required') ? 'Debes introducir un email' :
		this.formRegistro.controls.email.hasError('email') ? 'Email invalido' :
		'';
	}
	
	validarPassword(group){
		if(group.controls.password != group.controls.passwordConfirm){
			
		}else{
			return null
		}
	}

}
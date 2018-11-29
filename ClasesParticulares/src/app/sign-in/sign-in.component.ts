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
				Validators.pattern(/^[a-zA-Z]+$/)
				]),
			apellidos: new FormControl('',[
				Validators.required,
				Validators.maxLength(40),
				Validators.pattern(/^[a-zA-Z ]+$/)
				]),
			email: new FormControl('', [
				Validators.required,
				Validators.email
				]),
			contrasena: new FormControl('1234',[
				Validators.required
				]),
			confirmarContrasena: new FormControl('9876',[
				Validators.required
				]),
			telefono: new FormControl('',[
				Validators.required,
				Validators.minLength(9),
				Validators.pattern(/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/)
				]) 
		}, {validators: [this.validarPassword]})
		this.checked = false;
		this.hide = true;
	}
	ngOnInit() {
		console.log(this.formRegistro.controls.contrasena.value)
		console.log(this.formRegistro.controls.confirmarContrasena.value)

	}
	envioRegistro(){

	}
	mensajeErrorEmail() {
		return this.formRegistro.controls.email.hasError('required') ? 'Debes introducir un email' :
		this.formRegistro.controls.email.hasError('email') ? 'Email invalido' :
		'';
	}
	
	validarPassword(group: FormGroup){
		if(group.controls.contrasena.value != group.controls.confirmarContrasena.value  ){
			console.log('no coincide')
			return {
				coincidencia: true
			}
		}else{
			console.log('coincide')
			return null
		}
	}

}
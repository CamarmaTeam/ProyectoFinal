import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
<<<<<<< HEAD
import Pselect from 'pselect.js';
=======
>>>>>>> release/Cambio_ssd_v1.0.1

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

	checked: boolean;
<<<<<<< HEAD
	show: boolean ;
=======
	show: boolean = true;
>>>>>>> release/Cambio_ssd_v1.0.1
	hide: boolean ;

	formRegistro: FormGroup;
	constructor() {
		this.formRegistro = new FormGroup({
			nombre: new FormControl('',[
				Validators.required,
<<<<<<< HEAD
				Validators.maxLength(25),
				]),
			apellidos: new FormControl('',[
				Validators.required,
				Validators.maxLength(40),
=======
				]),
			apellidos: new FormControl('',[
				Validators.required
>>>>>>> release/Cambio_ssd_v1.0.1
				]),
			email: new FormControl('', [
				Validators.required,
				Validators.email
				]),
			password: new FormControl('',[
				Validators.required
				]),
<<<<<<< HEAD
			passwordConfirm: new FormControl('',[
				Validators.required
				]),
=======
>>>>>>> release/Cambio_ssd_v1.0.1
			telefono: new FormControl('',[
				Validators.required
				]) 
		})
		this.checked = false;
<<<<<<< HEAD
		this.show = true;
=======
>>>>>>> release/Cambio_ssd_v1.0.1
		this.hide = true;
	}

	ngOnInit() {
	}

<<<<<<< HEAD
	mensajeErrorEmail() {
=======
	getErrorMessage() {
>>>>>>> release/Cambio_ssd_v1.0.1
		return this.formRegistro.controls.email.hasError('required') ? 'Debes introducir un email' :
		this.formRegistro.controls.email.hasError('email') ? 'Email invalido' :
		'';

	}
	envioRegistro(){

	}
	

}
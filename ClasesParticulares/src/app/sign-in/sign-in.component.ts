import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

	checked: boolean;
	show: boolean = true;
	hide: boolean ;

	formRegistro: FormGroup;
	constructor() {
		this.formRegistro = new FormGroup({
			nombre: new FormControl('',[
				Validators.required,
				]),
			apellidos: new FormControl('',[
				Validators.required
				]),
			email: new FormControl('', [
				Validators.required,
				Validators.email
				]),
			password: new FormControl('',[
				Validators.required
				]),
			telefono: new FormControl('',[
				Validators.required
				]) 
		})
		this.checked = false;
		this.hide = true;
	}

	ngOnInit() {
	}

	getErrorMessage() {
		return this.formRegistro.controls.email.hasError('required') ? 'Debes introducir un email' :
		this.formRegistro.controls.email.hasError('email') ? 'Email invalido' :
		'';

	}
	envioRegistro(){

	}
	

}
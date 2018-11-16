import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
	selector: 'app-log-in',
	templateUrl: './log-in.component.html',
	styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
	
	formLogIn: FormGroup;
	hide: boolean ;
	eye: string;
	
	
	constructor() {
		this.formLogIn = new FormGroup({
			email: new FormControl('', [
				Validators.required,
				Validators.email
				]),
			password: new FormControl('',[
				Validators.required
				])
		})
		this.hide = true;
		this.eye = ' grey eye icon';
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

	}


}

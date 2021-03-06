import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import Pselect from 'pselect.js';
import { ApiService } from '../api.service';
import { Usuario } from '../models/usuario.model';
import { UsuarioProfesor } from '../models/usuarioProfesor.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AlertaComponent } from '../alerta/alerta.component';
import { Router } from '@angular/router';

export interface DialogData {
	text: string;

}

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss']
})


export class SignInComponent implements OnInit {

	usuario: Usuario;
	usuarioProfesor: UsuarioProfesor;

	checked: boolean;	
	hide: boolean;
	provincia: string;
	ciudad: string;
	registrarUsuario: string;

	formRegistro: FormGroup;
	constructor(private apiService: ApiService, public dialog: MatDialog,  private router : Router) {
		this.formRegistro = new FormGroup({
			nombre: new FormControl('',[
				Validators.required,
				Validators.maxLength(25),
				Validators.pattern(/(^$)|(^([^\-!#\$%&\(\)\*,\./:;\?@\[\\\]_\{\|\}¨ˇ“”€\+<=>§°\d\s¤®™©]| )+$)/)
				]),
			apellidos: new FormControl('',[
				Validators.required,
				Validators.maxLength(40),
				Validators.pattern(/(^$)|(^([^\-!#\$%&\(\)\*,\./:;\?@\[\\\]_\{\|\}¨ˇ“”€\+<=>§°\d\s¤®™©]| )+$)/)
				]),
			email: new FormControl('', [
				Validators.required,
				Validators.email
				]),
			provincia: new FormControl(''),
			ciudad: new FormControl(''),
			contrasena: new FormControl('',[
				Validators.required,
				Validators.pattern(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/),
				Validators.maxLength(20),
				]),
			confirmarContrasena: new FormControl('',[
				Validators.required,
				Validators.minLength(6),
				]),
			telefono: new FormControl('',[
				Validators.required,
				Validators.minLength(9),
				Validators.pattern(/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/)
				]),
			foto: new FormControl(''),
			biografia: new FormControl(''),
		},{validators: [this.validarPassword]})


		this.checked = false;
		this.hide = true;
		this.provincia = '';
		this.ciudad = '';
		this.registrarUsuario = 'alumno';


	}
	ngOnInit() {
	}


	envioRegistro(){
		this.formRegistro.value.provincia = this.provincia
		this.formRegistro.value.ciudad = this.ciudad
		if(this.formRegistro.value.provincia != '' ){
			this.decidirRegistro()
			
		}else{
			console.log('no se puede registrar')
		}
		
	}
	decidirRegistro(){

		if(this.registrarUsuario == 'alumno'){
			this.usuario = new Usuario(this.formRegistro.value)
			this.apiService.postUsuario(this.usuario).then((res) => {
				let respuesta = res.json()
				this.router.navigate(['/login'])
				this.openDialog()
				
			})
			
		}else{
			this.usuarioProfesor = new UsuarioProfesor(this.formRegistro.value)
			this.apiService.postUsuarioProfesor(this.usuarioProfesor).then((res) => {
				let respuesta = res.json()
				
				this.openDialog()

			})
			
		}
	}
	validarPassword(group: FormGroup){
		if( group.controls.contrasena.value != group.controls.confirmarContrasena.value){
			return {
				coincidencia: true
			}
		}else{
			return null
		}
	}
	handleEnvioProv(provRecibida){
		this.provincia = provRecibida
	}
	handleEnvioMun(munRecibido){
		this.ciudad = munRecibido
	}
	handleClickRegistro($event){
		this.registrarUsuario = $event.currentTarget.id;
		if(this.registrarUsuario == 'profesor'){
			this.checked = true
		}else{
			this.checked = false
		}	
	}

	openDialog(): void {
		window.scrollTo(0, 0);
		const dialogRef = this.dialog.open(AlertaComponent, {
			width: '350px',
			data: {text: 'El registro se ha realizado correctamente'}

		})
		this.router.navigate(['/login'])

	}

	
}



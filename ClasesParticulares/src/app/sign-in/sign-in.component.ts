import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import Pselect from 'pselect.js';
import { ApiService } from '../api.service';
import { Usuario } from '../models/usuario.model';
import { UsuarioProfesor } from '../models/usuarioProfesor.model';


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
	constructor(private apiService: ApiService) {
		this.formRegistro = new FormGroup({
			nombre: new FormControl('sad',[
				Validators.required,
				Validators.maxLength(25),
				Validators.pattern(/(^$)|(^([^\-!#\$%&\(\)\*,\./:;\?@\[\\\]_\{\|\}¨ˇ“”€\+<=>§°\d\s¤®™©]| )+$)/)
				]),
			apellidos: new FormControl('asd',[
				Validators.required,
				Validators.maxLength(40),
				Validators.pattern(/(^$)|(^([^\-!#\$%&\(\)\*,\./:;\?@\[\\\]_\{\|\}¨ˇ“”€\+<=>§°\d\s¤®™©]| )+$)/)
				]),
			email: new FormControl('a@es.es', [
				Validators.required,
				Validators.email
				]),
			provincia: new FormControl(''),
			ciudad: new FormControl(''),
			contrasena: new FormControl('123456a',[
				Validators.required,
				Validators.pattern(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/),
				Validators.maxLength(20),
				]),
			confirmarContrasena: new FormControl('123456a',[
				Validators.required,
				Validators.minLength(6),
				]),
			telefono: new FormControl('123456789',[
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
			console.log('se puede registrar')
		}else{
			console.log('no se puede registrar')
		}
		console.log(this.formRegistro.value)
	}
	decidirRegistro(){

		if(this.registrarUsuario == 'alumno'){
			this.usuario = new Usuario(this.formRegistro.value)
			this.apiService.postUsuario(this.usuario).then((res) => {
				console.log(res.json())
			})
			console.log('registrar alumno')
		}else{
			this.usuarioProfesor = new UsuarioProfesor(this.formRegistro.value)
			this.apiService.postUsuarioProfesor(this.usuarioProfesor).then((res) => {
				console.log(res.json())
			})
			console.log('registrar profesor')
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

}
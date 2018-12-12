import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import Pselect from 'pselect.js';
import { ApiService } from '../api.service';
import { Usuario } from '../models/usuario.model';
import { UsuarioProfesor } from '../models/usuarioProfesor.model';


@Component({
	selector: 'app-perfil',
	templateUrl: './perfil.component.html',
	styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

	usuario: Usuario;
	usuarioProfesor: UsuarioProfesor;
	datos: any;
	

	checked: boolean;	
	hide: boolean;
	provinciaR: string;
	provinciaE: string;
	ciudadR: string;
	ciudadE: string;
	registrarUsuario: string;

	formModificar: FormGroup;
	constructor(private apiService: ApiService) {
		this.formModificar = new FormGroup({
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
		this.provinciaR = '';
		this.ciudadR = '';
		this.registrarUsuario = 'alumno';
	}
	ngOnInit() {

		this.apiService.datosPerfil().then((res) => {
			const response = res.json()
			this.datos = response[0]
			
			this.formModificar.controls.nombre.setValue(this.datos.nombre)
			this.formModificar.controls.apellidos.setValue(this.datos.apellidos)
			this.formModificar.controls.email.setValue(this.datos.email)
			this.formModificar.controls.provincia.setValue(this.datos.provincia)
			this.formModificar.controls.ciudad.setValue(this.datos.ciudad)
			this.formModificar.controls.telefono.setValue(this.datos.telefono)
			this.formModificar.controls.foto.setValue(this.datos.foto)
			this.formModificar.controls.biografia.setValue(this.datos.biografia)
			this.provinciaR = this.datos.provincia
			this.ciudadR = this.datos.ciudad
		})
	}
	envioRegistro(){
		this.formModificar.value.provincia = this.provinciaE
		this.formModificar.value.ciudad = this.ciudadE
		if(this.formModificar.value.provincia != '' ){
			this.decidirRegistro()
		}else{
			console.log('no se puede registrar')
		}
		
	}
	decidirRegistro(){

		if(this.registrarUsuario == 'alumno'){
			this.usuario = new Usuario(this.formModificar.value)
			this.apiService.modificarUsuario(this.datos.id, this.usuario).then((res) => {
				const response = res.json()

			})
		}else{
			this.usuarioProfesor = new UsuarioProfesor(this.formModificar.value)
			this.apiService.modificarUsuarioProfesor(this.usuarioProfesor).then((res) => {
				const response = res.json()
				console.log(response)
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
		console.log(provRecibida)
		this.provinciaE = provRecibida
	}
	handleEnvioMun(munRecibido){
		this.ciudadE = munRecibido
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
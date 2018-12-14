import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import Pselect from 'pselect.js';
import { ApiService } from '../api.service';
import { LoginService } from '../login.service';
import { Usuario } from '../models/usuario.model';
import { UsuarioProfesor } from '../models/usuarioProfesor.model';
import * as $ from 'jquery'


@Component({
	selector: 'app-perfil',
	templateUrl: './perfil.component.html',
	styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
	@ViewChild('provincia') prov: any
	@ViewChild('municipio') muni: any


	usuario: Usuario;
	usuarioProfesor: UsuarioProfesor;
	datos: any;
	

	checked: boolean;	
	hide: boolean;
	ps: boolean;
	provincia: string;
	ciudad: string;
	registrarUsuario: string;

	formModificar: FormGroup;
	constructor(private apiService: ApiService, private loginService: LoginService) {
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
		this.ps = false;
		this.provincia = '';
		this.ciudad = '';

		if (this.loginService.isProfesor() === true) {
			this.registrarUsuario = 'profesor';
		} else {
			this.registrarUsuario = 'alumno';
		}
		
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
			
			//  new Pselect().create(this.prov.nativeElement, this.muni.nativeElement)

			// $('#ps-prov option:selected').removeAttr('selected')

			// $("#ps-prov option:contains('Madrid')").attr('selected', 'selected')
			// let selected = $("#ps-prov option:contains('Madrid')")
			// console.log(selected.attr('value'))

			// console.log($("#ps-prov").val(selected.attr('value')))

			// for (var i = 0; i < ($("#ps-prov")[0].length); i++){
			// 	if ($("#ps-prov")[0][i].text == this.datos.provincia){
			// 		let d = $("#ps-prov")[0][0]
			// 		d.selected = false	
			// 		console.log($("#ps-prov")[0][i].text)
			// 		let c = $("#ps-prov")[0][i]
			// 		c.attr('selected', 'selected')

			// 	}
			// }

			// console.log($("#ps-mun")[0])

			// for (var j = 0; j < ($("#ps-mun")[0].length); j++){
			// 	if ($("#ps-mun")[0][i].text == this.datos.ciudad){
			// 		console.log('entro if')
				//console.log($("#ps-mun")[0][i].text)
				//let  = $("#ps-mun")[0][i]
				//c.selected = true
			// 	}
			// }

			
			
				
					})

		
	}
	envioRegistro(){

		this.formModificar.value.provincia = this.provincia
		this.formModificar.value.ciudad = this.ciudad
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
				console.log(res.json())
			})
		}else{
			this.usuarioProfesor = new UsuarioProfesor(this.formModificar.value)
			this.apiService.modificarUsuarioProfesor(this.datos.id, this.usuarioProfesor).then((res) => {
				console.log(res.json())
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

	onChangeProv($event){
        this.provincia = $event.target.selectedOptions[0].label
        setTimeout(() => {
            this.ciudad = this.muni.nativeElement.selectedOptions[0].label
        }, 100)
    }

    onChangeMun($event){
        this.ciudad = $event.target.selectedOptions[0].label
        
    }
	// handleEnvioProv(provRecibida){
	// 	this.provincia = provRecibida
	// }
	// handleEnvioMun(munRecibido){
	// 	this.ciudad = munRecibido
	// }
	handleClickRegistro($event){
		this.registrarUsuario = $event.currentTarget.id;
		if(this.registrarUsuario == 'profesor'){
			this.checked = true
		}else{
			this.checked = false
		}	
	}

	handleEnvioProv(provRecibida){
		this.provincia = provRecibida
	}
	handleEnvioMun(munRecibido){
		this.ciudad = munRecibido
	}
	

}
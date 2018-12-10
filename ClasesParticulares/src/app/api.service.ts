import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LoginService} from './login.service';


@Injectable({
	providedIn: 'root'
})
export class ApiService {

	baseUrl: string = 'http://localhost:3000/api'
	token: string 

	constructor(private http: Http, private loginService: LoginService) { 
		this.token = ''
	}
	// Obtener TODAS las CLASES
	getClases(){
		return this.http.get(`${this.baseUrl}/clases`).toPromise()
	}
	//Añadir clase 
	postClaseNueva(values){
		return this.http.post(`${this.baseUrl}/clases`, values).toPromise()
	}	
	//Registrar USUARIO
	postUsuario(values){
		return this.http.post(`${this.baseUrl}/usuarios`, values).toPromise()
	}
	//Registrar PROFESOR
	postUsuarioProfesor(values){
		return this.http.post(`${this.baseUrl}/usuariosProfesor`, values).toPromise()
	}
	//Iniciar sesión USUARIO
	postLoginUsuario(values){
		return this.http.post(`${this.baseUrl}/usuarios/login`,values).toPromise()
	}
	//Iniciar sesión PROFESOR
	postLoginProfesor(values){
		return this.http.post(`${this.baseUrl}/usuariosProfesor/login`, values).toPromise()
	}

	//Datos del Usuario
	datosPerfil(){
		this.token = localStorage.getItem('token')
		if(this.loginService.isProfesor() === false) {
			return this.http.get(`${this.baseUrl}/usuarios/token/${this.token}`).toPromise()
		}else {
			return this.http.get(`${this.baseUrl}/usuariosprofesor/token/${this.token}`).toPromise()
		}
	}

	
}

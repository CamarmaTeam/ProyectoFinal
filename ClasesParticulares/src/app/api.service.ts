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
	//Obtener clase de usuario
	getClasesByUsuario(fkusuarioprofesor){
		// this.token = localStorage.getItem('token')
		return this.http.get(`${this.baseUrl}/clases/${fkusuarioprofesor}`).toPromise()
	}
	//Añadir clase 
	postClaseNueva(values){
		return this.http.post(`${this.baseUrl}/clases`, values).toPromise()
	}
	//Eliminar clase
	getEliminarClase(id){
		return this.http.get(`${this.baseUrl}/clases/delete/${id}`).toPromise()
	}
	//Filtrar clases
	posClaseByFilter(values){
		return this.http.post(`${this.baseUrl}/clases/filtro`, values).toPromise()
	}

	
	//Registrar USUARIO
	postUsuario(values){
		return this.http.post(`${this.baseUrl}/usuarios`, values).toPromise()
	}
	//Registrar PROFESOR
	postUsuarioProfesor(values){
		return this.http.post(`${this.baseUrl}/usuariosProfesor`, values).toPromise()
	}
	//Modificar USUARIO
	modificarUsuario(idUser, values){
		let id = idUser
		return this.http.post(`${this.baseUrl}/usuarios/modificar/${id}`, values).toPromise()
	}
	//Modificar PROFESOR
	modificarUsuarioProfesor(idUser, values){
		let id = idUser
		return this.http.post(`${this.baseUrl}/usuariosprofesor/modificar/${id}`, values).toPromise()
	}
	//Iniciar sesión USUARIO
	postLoginUsuario(values){
		return this.http.post(`${this.baseUrl}/usuarios/login`,values).toPromise()
	}
	//Iniciar sesión PROFESOR
	postLoginProfesor(values){
		return this.http.post(`${this.baseUrl}/usuariosprofesor/login`, values).toPromise()
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

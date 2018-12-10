import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	baseUrl: string = 'http://localhost:3000/api'

	constructor(private http: Http) { }
	// Obtener TODAS las CLASES
	getClases(){
		return this.http.get(`${this.baseUrl}/clases`).toPromise()
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

	
}

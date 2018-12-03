import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	baseUrl: string = 'http://6980672d.ngrok.io/api'

	constructor(private http: Http) { }

	getClases(){
		return this.http.get(`${this.baseUrl}/clases`).toPromise()
	}
	postUsuario(values){
		return this.http.post(`${this.baseUrl}/usuarios`, values).toPromise()
	}
	postUsuarioProfesor(values){
		return this.http.post(`${this.baseUrl}/usuariosProfesor`, values).toPromise()
	}
}

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	baseUrl: string = 'http://12824d36.ngrok.io/api'

	constructor(private http: Http) { }

	getClases(){
		return this.http.get(`${this.baseUrl}/clases`).toPromise()
	}
}

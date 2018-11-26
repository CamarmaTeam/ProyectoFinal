import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {

  constructor(private http: Http) { }

  	getAll() {
  		let url = 'https://proyecto-marianoo.firebaseio.com/clases.json'
  		return this.http.get(url).toPromise()
  	}
}

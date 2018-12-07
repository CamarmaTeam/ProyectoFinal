import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable({
	providedIn: 'root'
})
export class LoginService {

	constructor(private http: Http) { }

	isLogin(){
		let token = localStorage.getItem("token")
		if(token === null ){
			return false
		}else{
			return true
		}
	}
	isProfesor(){
		let token = localStorage.getItem("token")
		if(token === null){
			return false
		}else if(token.length === 12 ){
			return true
		}else{
			return false
		}
	}
}

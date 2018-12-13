import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Clase } from '../models/clase.model';


@Component({
	selector: 'app-clase',
	templateUrl: './clase.component.html',
	styleUrls: ['./clase.component.scss']
})
export class ClaseComponent implements OnInit {

	arrClases: Clase[]
	fkusuarioprofesor: number;

	constructor(private apiService: ApiService) {
		this.arrClases = [];
	}

	ngOnInit() {


		this.apiService.datosPerfil().then((res) => {
			let response = res.json()
			this.fkusuarioprofesor = response[0].id
			console.log(this.fkusuarioprofesor)
			this.apiService.getClasesByUsuario(this.fkusuarioprofesor).then((res) => {
				console.log(res.json())
				this.arrClases = res.json()
			})

		})
		
	}

	handleEliminar(claseId){
		this.apiService.getEliminarClase(claseId).then((res) => {
			console.log(res.json())
			this.apiService.getClasesByUsuario(this.fkusuarioprofesor).then((res) => {
				console.log(res.json())
				this.arrClases = res.json()
			})
		}) 
	}
	





}

export class CardFancyExample {}
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Clase } from '../models/clase.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { EliminarComponent } from '../eliminar/eliminar.component';
import { Router } from '@angular/router';

export interface DialogData {
  text: string;
  id: number;
  delete: any;
}

@Component({
	selector: 'app-clase',
	templateUrl: './clase.component.html',
	styleUrls: ['./clase.component.scss']
})
export class ClaseComponent implements OnInit {

	arrClases: Clase[]
	fkusuarioprofesor: number;
	ClaseEliminar: number;

	constructor(private apiService: ApiService, public dialog: MatDialog,  private router : Router ) {
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

	eliminar(claseId){
		this.apiService.getEliminarClase(claseId).then((res) => {
			console.log(res.json())
			this.apiService.getClasesByUsuario(this.fkusuarioprofesor).then((res) => {
				console.log(res.json())
				this.arrClases = res.json()
			})
		}) 
	}

	handleEliminar(claseId){
		this.ClaseEliminar = claseId
		this.openDialog()
		

	}

	openDialog(): void {
	let id = this.ClaseEliminar
    window.scrollTo(0, 0);
    const dialogRef = this.dialog.open(EliminarComponent, {
      width: '350px',
      data: {
      	text: '¿Seguro que quiere eliminar la Clase?', 
      	id:`${id}`,
      	delete: ()=>{
      		this.eliminar(id)
      	}
      	
      }

    })
}
	





}

export class CardFancyExample {}
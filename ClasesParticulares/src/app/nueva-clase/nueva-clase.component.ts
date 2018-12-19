import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ApiService } from '../api.service';
import { Clase } from '../models/clase.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AlertaComponent } from '../alerta/alerta.component';
import { Router } from '@angular/router';

export interface DialogData {
	text: string;

}

@Component({
	selector: 'app-nueva-clase',
	templateUrl: './nueva-clase.component.html',
	styleUrls: ['./nueva-clase.component.scss']
})
export class NuevaClaseComponent implements OnInit {

	mostrar: boolean;
	clase: Clase;
	datosClase: any;
	ramas: string[];
	niveles: string[];

	formClase: FormGroup;
	constructor(private apiService: ApiService, public dialog: MatDialog,  private router : Router) {
		this.formClase = new FormGroup({
			fk_usuarioprofesor: new FormControl(''),
			nombreclase: new FormControl(''),
			rama: new FormControl(''),
			descripcion: new FormControl(''),
			nivel: new FormControl(''),
			foto: new FormControl(''),
			ciudad: new FormControl(''),
			provincia: new FormControl(''),
			clasein: new FormControl(''),
			claseout: new FormControl(''),
			claseciudad: new FormControl(''),
			clasefueraciudad: new FormControl('')
		})
		this.mostrar = false
		this.ramas = ['Deportes', 'Idiomas', 'Teatro']
		this.niveles = ['Bajo', 'Medio', 'Alto']
	}

	ngOnInit() {
		this.apiService.datosPerfil().then((res) => {
			let response = res.json()
			this.datosClase = response[0]
			
			this.formClase.controls.fk_usuarioprofesor.setValue(this.datosClase.id)
			this.formClase.controls.foto.setValue(this.datosClase.foto)
			this.formClase.controls.ciudad.setValue(this.datosClase.ciudad)
			this.formClase.controls.provincia.setValue(this.datosClase.provincia)
			this.formClase.controls.clasein.setValue(false)
			this.formClase.controls.claseout.setValue(false)
			this.formClase.controls.claseciudad.setValue(false)
			this.formClase.controls.clasefueraciudad.setValue(false)
			console.log(res.json())
		})
		this.apiService.datosPerfil().then((res) => {
			const response = res.json()
			
		})
	}

	nuevaClase(){
		this.formClase.controls.rama.value.toLowerCase()
		this.formClase.controls.nivel.value.toLowerCase()
		console.log(this.formClase.value)
		this.clase = new Clase(this.formClase.value)
		this.apiService.postClaseNueva(this.clase).then((res) => {
			let respuesta = res.json()
			this.openDialog()
		})
	}
	mostrarDistancia(){
		this.mostrar = !this.mostrar
	}

	openDialog(): void {
		window.scrollTo(0, 0);
		const dialogRef = this.dialog.open(AlertaComponent, {
			width: '350px',
			data: {text: 'La Clase se ha creado correctamente'}

		})
		this.router.navigate(['/clases'])
	}
	handleRama($event){
		console.log(this.formClase.controls.rama)
	}

}

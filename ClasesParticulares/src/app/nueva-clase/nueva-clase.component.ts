import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ApiService } from '../api.service';
import { Clase } from '../models/clase.model';


@Component({
	selector: 'app-nueva-clase',
	templateUrl: './nueva-clase.component.html',
	styleUrls: ['./nueva-clase.component.scss']
})
export class NuevaClaseComponent implements OnInit {

	mostrar: boolean;
	clase: Clase;

	formClase: FormGroup;
	constructor(private apiService: ApiService) {
		this.formClase = new FormGroup({
			nombreclase: new FormControl(''),
			rama: new FormControl(''),
			descripcion: new FormControl(''),
			nivel: new FormControl(''),
			claseIn: new FormControl(''),
			claseOut: new FormControl(''),
			claseCiudad: new FormControl(''),
			claseFueraCiudad: new FormControl('')
		})
		this.mostrar = false
	}

	ngOnInit() {
		this.apiService.datosPerfil().then((res) => {
			console.log(res.json())
		})
	}

	nuevaClase(){
		this.clase = new Clase(this.formClase)
		this.apiService.postClaseNueva(this.clase).then((res) => {
			console.log(res.json())
		})
	}
	mostrarDistancia(){
		this.mostrar = !this.mostrar
	}

}

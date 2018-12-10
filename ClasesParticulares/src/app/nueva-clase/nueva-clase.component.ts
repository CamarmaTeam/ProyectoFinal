import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ApiService } from '../api.service';


@Component({
	selector: 'app-nueva-clase',
	templateUrl: './nueva-clase.component.html',
	styleUrls: ['./nueva-clase.component.scss']
})
export class NuevaClaseComponent implements OnInit {

	mostrar: boolean;

	formClase: FormGroup;
	constructor(private apiService: ApiService) {
		this.formClase = new FormGroup({
			nombre: new FormControl(''),
			rama: new FormControl(''),
			descripcion: new FormControl(''),
			nivel: new FormControl(''),
			claseIn: new FormControl(''),
			claseOut: new FormControl(''),
			enciudad: new FormControl(''),
			fueraciudad: new FormControl('')
		})
		this.mostrar = false
	}

	ngOnInit() {
	}

	nuevaClase(){
		
	}
	mostrarDistancia(){
		this.mostrar = !this.mostrar
	}

}

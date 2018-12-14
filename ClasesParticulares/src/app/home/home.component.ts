import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Clase } from '../models/clase.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	arrClases: Clase[]
  niveles: string[]
  ramas: string[]

  constructor(private apiService: ApiService) { 
  	this.arrClases = []
    this.niveles = ['bajo', 'medio', 'avanzado']
    this.ramas = ['deportes', 'idiomas', 'música']
  }

  ngOnInit() {

  	this.apiService.getClases().then((res) => {
  		this.arrClases = res.json()
  		
  	})
  }

  handleChange(filtros){
    console.log(filtros.selectedOptions.selected)
  }

}
export class CardFancyExample {}


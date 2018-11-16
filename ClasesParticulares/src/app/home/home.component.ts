import { Component, OnInit } from '@angular/core';
import { ClasesService } from '../clases.service';
import { Clase } from '../models/clase.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	arrClases: Clase[]

  constructor(private clasesService: ClasesService) { 
  	this.arrClases = []
  }

  ngOnInit() {

  	this.clasesService.getAll().then((res) => {
  		this.arrClases = res.json()
  		console.log(res.json())
  	})
  }

}

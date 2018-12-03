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

  constructor(private apiService: ApiService) { 
  	this.arrClases = []
  }

  ngOnInit() {

  	this.apiService.getClases().then((res) => {
  		this.arrClases = res.json()
  		
  	})
  }

}

export class CardFancyExample {}

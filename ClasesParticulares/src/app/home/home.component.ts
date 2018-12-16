import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { LoginService } from '../login.service'
import { Clase } from '../models/clase.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AlertaComponent } from '../alerta/alerta.component';
import { ContactoComponent } from '../contacto/contacto.component'
import { Router } from '@angular/router';
import Pselect from 'pselect.js'
import * as $ from 'jquery'
export interface DialogData {
  text: string;
}

export interface DialogDataContacto {
  nombre: string
  telefono: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('provincia') prov: any
  @ViewChild('municipio') muni: any

  arrClases: Clase[]
  niveles: string[]
  ramas: string[]
  filtroRama: string
  filtroNivel: string
  filtroProvincia: string
  filtroCiudad: string
  objetoFiltros: any 
  disabled: boolean

  constructor(private loginService: LoginService, private apiService: ApiService,  public dialog: MatDialog,  private router : Router) { 
  	this.arrClases = []
    this.niveles = ['Bajo', 'Medio', 'Alto']
    this.ramas = ['Deportes', 'Idiomas', 'Teatro']
    this.disabled = true

    this.objetoFiltros = {
      rama : '' ,
      nivel: '',
      provincia: '',
      ciudad: '' 
    }
  }

  ngOnInit() {

  	this.apiService.getClases().then((res) => {
  		this.arrClases = res.json() 		
  	})
    new Pselect().create(this.prov.nativeElement, this.muni.nativeElement)
  }

  openDialog(): void {
    window.scrollTo(0, 0);
    const dialogRef = this.dialog.open(AlertaComponent, {
      width: '350px',
      data: {text: 'El registro se ha realizado correctamente'}

    })
    this.router.navigate(['/login'])

  }

  muestraContacto(): void {
    window.scrollTo(0, 0);
    const dialogRef = this.dialog.open(ContactoComponent, {
      width: '380px',
      data: {nombre: 'Mariano', telefono: '654112660'}

    })


  } 
  noMuestraContacto(): void {
    window.scrollTo(0, 0);
    const dialogRef = this.dialog.open(AlertaComponent, {
      width: '350px',
      data: {text: 'Para ver esta Información debe registrarse'}

    })
    this.router.navigate(['/login'])

  }

  contacto(){
    let login = this.loginService.isLogin()
    if(login === true){
      this.muestraContacto()
    } else {
      this.noMuestraContacto()
    }    
  }
  filtrarClases(){
    this.apiService.postClaseByFilter(this.objetoFiltros).then((res) => {
      this.arrClases = res.json()
    })
  }
  handleRama($event){
    let value =  $event.target.value.toLowerCase()
    if(value !="todas"){
      this.objetoFiltros.rama = value
      this.filtrarClases()
      this.disabled = false
      console.log(this.objetoFiltros)
    }else{
      $('#nivel')[0].value = 'Todos'
      this.objetoVacio()
      this.apiService.getClases().then((res) => {
        this.arrClases = res.json()
        this.disabled = true
        console.log(this.objetoFiltros)
      })
      
    }
    
  }
  handleNivel($event){
    let  value = $event.target.value.toLowerCase()
    if(value != 'todos'){
      this.objetoFiltros.nivel = value
      this.filtrarClases()
      console.log(this.objetoFiltros)
    }else{
      this.objetoFiltros.nivel=''
      this.filtrarClases()
      console.log(this.objetoFiltros)
    }
    
  }
  handleProv($event){
    if($event.target.selectedOptions[0].label != 'Provincia'){
      this.objetoFiltros.provincia = $event.target.selectedOptions[0].label
      this.filtrarClases()
      setTimeout(() => {
        $('#ps-mun')[0].selectedOptions[0].label = 'Municipio'
      },5)
      console.log($('#ps-prov')[0].selectedOptions[0].value)

    }else{
      this.objetoFiltros.provincia=''
      this.filtrarClases()
      console.log($('#ps-prov')[0].selectedOptions[0].value)

    }
    
    

  }
  handleMun($event){
    if($event.target.selectedOptions[0].label != 'Municipio'){
      this.objetoFiltros.ciudad = $event.target.selectedOptions[0].label
      this.filtrarClases() 
    }else{
      this.objetoFiltros.ciudad=''
      this.filtrarClases()

    }
    
  }
  handleReset(){

    $('#rama')[0].value = 'Todas' 
    $('#nivel')[0].value = 'Todos'
    $('#ps-prov')[0].selectedOptions[0].label = 'Provincia'   
    $('#ps-mun')[0].selectedOptions[0].label = 'Municipio'
    
    
    this.objetoVacio()
    this.disabled = true

    this.apiService.getClases().then((res) => {
      this.arrClases = res.json()     
    })
    console.log(this.objetoFiltros)
  }
  objetoVacio(){
    this.objetoFiltros = {
      rama : '' ,
      nivel: '',
      provincia: '',
      ciudad: '' 
    }
  }
}
export class CardFancyExample {}


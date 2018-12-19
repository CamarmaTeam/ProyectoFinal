import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { LoginService } from '../login.service'
import { Clase } from '../models/clase.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AlertaComponent } from '../alerta/alerta.component';
import { ContactoComponent } from '../contacto/contacto.component';
import { FichaComponent } from '../ficha/ficha.component';
import { Router } from '@angular/router';
import Pselect from 'pselect.js'
import * as $ from 'jquery'

export interface DialogData {
  text: string;
}

export interface DialogDataContacto {
  nombre: string;
  apellidos: string;
  telefono: number;
}

export interface DialogDataFicha {
  nombre: string;
  apellidos: string;
  telefono: number;
  provincia: string;
  ciudad: string;
  biografia: string;
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
  user: any
  niveles: string[]
  ramas: string[]
  filtroRama: string
  filtroNivel: string
  filtroProvincia: string
  filtroCiudad: string
  objetoFiltros: any 
  disabled: boolean
  puntos: number
  arrVacio: boolean

  constructor(private loginService: LoginService, private apiService: ApiService,  public dialog: MatDialog,  private router : Router) { 
  	this.arrClases = []
    this.niveles = ['Bajo', 'Medio', 'Alto']
    this.ramas = ['Deportes', 'Idiomas', 'Teatro']
    this.disabled = true
    this.arrVacio = false
    

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

  muestraContacto(pUser): void {
    this.apiService.getProfe(pUser).then((res) => {
      this.user = res.json()
     
    })
    setTimeout(() => {
      window.scrollTo(0, 0);
    const dialogRef = this.dialog.open(ContactoComponent, {
      width: '380px',
      data: {nombre: this.user[0].nombre, apellidos: this.user[0].apellidos, telefono: this.user[0].telefono}

    })
    },100)


  } 
  muestraFicha(pUser): void {
    console.log('muestra ficha')
    this.apiService.getProfe(pUser).then((res) => {
      this.user = res.json()
     
    })
    setTimeout(() => {
      window.scrollTo(0, 0);
    const dialogRef = this.dialog.open(FichaComponent, {
      width: '380px',
      data: {nombre: this.user[0].nombre, apellidos: this.user[0].apellidos, telefono: this.user[0].telefono, ciudad: this.user[0].ciudad , provincia: this.user[0].provincia , biografia: this.user[0].biografia }

    })
    },100)


  } 
  noMuestraContacto(): void {
    window.scrollTo(0, 0);
    const dialogRef = this.dialog.open(AlertaComponent, {
      width: '350px',
      data: {text: 'Para ver esta Información debe registrarse'}

    })
    this.router.navigate(['/login'])

  }
  noMuestraFicha(): void {
    window.scrollTo(0, 0);
    const dialogRef = this.dialog.open(AlertaComponent, {
      width: '350px',
      data: {text: 'Para ver esta Información debe registrarse'}

    })
    this.router.navigate(['/login'])

  }

  contacto(pUser){
    let login = this.loginService.isLogin()
    if(login === true){
      this.muestraContacto(pUser)
      
    } else {
      this.noMuestraContacto()
    }    
  }

  ficha(pUser){
    let login = this.loginService.isLogin()
    if(login === true){
      this.muestraFicha(pUser)
      
    } else {
      this.noMuestraFicha()
    }    
  }
  filtrarClases(){
    this.apiService.postClaseByFilter(this.objetoFiltros).then((res) => {
      this.arrClases = res.json()
      if(this.arrClases.length == 0){
        this.arrVacio = true
      }
      console.log(this.arrClases.length)
      console.log(this.arrVacio)
    })
  }
  handleRama($event){
    let value =  $event.target.value.toLowerCase()
    if(value !="todas"){
      this.objetoFiltros.rama = value
      this.filtrarClases()
      this.disabled = false
      
    }else{
      $('#nivel')[0].value = 'Todos'
      this.objetoVacio()
      this.apiService.getClases().then((res) => {
        this.arrClases = res.json()
        this.disabled = true
      
      })
      
    }
    
  }
  handleNivel($event){
    let  value = $event.target.value.toLowerCase()
    if(value != 'todos'){
      this.objetoFiltros.nivel = value
      this.filtrarClases()
      
    }else{
      this.objetoFiltros.nivel=''
      this.filtrarClases()
      
    }
    
  }
  handleProv($event){
    if($event.target.selectedOptions[0].label != 'Provincia'){
      this.objetoFiltros.provincia = $event.target.selectedOptions[0].label
      this.filtrarClases()
      setTimeout(() => {
        $('#ps-mun')[0].selectedOptions[0].label = 'Municipio'
      },5)
      
    }else{
      this.objetoFiltros.provincia=''
      this.filtrarClases()
      

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
      this.arrVacio = false    
    })
    console.log(this.objetoFiltros)
    console.log(this.arrVacio)
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


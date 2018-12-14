import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { LoginService } from '../login.service'
import { Clase } from '../models/clase.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AlertaComponent } from '../alerta/alerta.component';
import { ContactoComponent } from '../contacto/contacto.component'
import { Router } from '@angular/router';

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

	arrClases: Clase[]
  niveles: string[]
  ramas: string[]
  filtroRama: string
  filtroNivel: string

  constructor(private loginService: LoginService, private apiService: ApiService,  public dialog: MatDialog,  private router : Router) { 
  	this.arrClases = []
    this.niveles = ['bajo', 'medio', 'avanzado']
    this.ramas = ['deportes', 'idiomas', 'música']
  }

  ngOnInit() {

  	this.apiService.getClases().then((res) => {
  		this.arrClases = res.json()
  		
  	})
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

  handleRama($event){
   this.filtroRama = $event.target.innerText
 }
 handleNivel($event){
   this.filtroNivel = $event.target.innerText

 }

}
export class CardFancyExample {}


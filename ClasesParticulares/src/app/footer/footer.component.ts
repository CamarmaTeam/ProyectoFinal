import { Component, OnInit } from '@angular/core';
import { AlertaComponent } from '../alerta/alerta.component';
import { ContactoFooterComponent } from '../contacto-footer/contacto-footer.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
	text: string;

}

export interface DialogDataContacto {
	nombre: string;
	telefono: number;
	fax: number;
	direccion: string;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

 //  handleMail() : void {
	// 	window.scrollTo(0, 0);
	// 	const dialogRef = this.dialog.open(AlertaComponent, {
	// 		width: '350px',
	// 		data: {text: 'redirect email'}

	// 	})
	// }

  handlePhone() : void {
		window.scrollTo(0, 0);
		const dialogRef = this.dialog.open(ContactoFooterComponent, {
			width: '350px',
			data: {nombre: 'EncuentraTusClasesParticulares', telefono: '918866987', fax:'918866988', direccion: 'Plaza de España, 11, Madrid'}

		})
	}

  handlePaypal() : void {
		window.scrollTo(0, 0);
		const dialogRef = this.dialog.open(AlertaComponent, {
			width: '350px',
			data: {text: 'SERVICIO DISPONIBLE PROXIMAMENTE'}

		})
	}

 //  handleFacebook(): void {
	// 	window.scrollTo(0, 0);
	// 	const dialogRef = this.dialog.open(AlertaComponent, {
	// 		width: '350px',
	// 		data: {text: 'facebook'}

	// 	})
	// }

  openDialog(): void {
		window.scrollTo(0, 0);
		const dialogRef = this.dialog.open(AlertaComponent, {
			width: '350px',
			data: {text: 'El registro se ha realizado correctamente'}

		})
	}
}

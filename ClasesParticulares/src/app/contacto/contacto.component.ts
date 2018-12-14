import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material';
import { DialogDataContacto } from '../home/home.component'

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent {

  constructor(
    public dialogRef: MatDialogRef<ContactoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataContacto) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

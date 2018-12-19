import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material';
import { DialogDataFicha } from '../home/home.component'

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.scss']
})
export class FichaComponent {

  constructor(
    public dialogRef: MatDialogRef<FichaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataFicha) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

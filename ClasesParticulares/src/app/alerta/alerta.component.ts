import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material';
import { DialogData } from '../sign-in/sign-in.component'

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'alerta.component.html',
})
export class AlertaComponent {

  constructor(
    public dialogRef: MatDialogRef<AlertaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
  
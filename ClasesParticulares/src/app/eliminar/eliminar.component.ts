import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material';
import { DialogData } from '../clase/clase.component'

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'eliminar.component.html',
})
export class EliminarComponent {

  constructor(
    public dialogRef: MatDialogRef<EliminarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

	onDeleteClick(){
		this.data.delete()
		 this.dialogRef.close()

	}

}
  
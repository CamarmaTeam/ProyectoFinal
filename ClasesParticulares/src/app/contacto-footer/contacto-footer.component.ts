import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material';
import { DialogDataContacto } from '../footer/footer.component'

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'contacto-footer.component.html',
  styleUrls: ['./contacto-footer.component.scss']
})
export class ContactoFooterComponent  {

   constructor(
    public dialogRef: MatDialogRef<ContactoFooterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataContacto) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

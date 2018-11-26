import { Component, ViewChild } from '@angular/core';
import Pselect from 'pselect.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ClasesParticulares';
  @ViewChild('provincia') prov: any
  @ViewChild('municipio') muni: any

  ngOnInit(){
  	new Pselect().create(this.prov.nativeElement, this.muni.nativeElement)
  }
}

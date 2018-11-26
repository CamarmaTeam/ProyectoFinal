import { Component, OnInit, ViewChild } from '@angular/core';
import Pselect from 'pselect.js'

@Component({
	selector: 'app-p-select',
	templateUrl: './p-select.component.html',
	styleUrls: ['./p-select.component.scss']
})
export class PSelectComponent implements OnInit {
	@ViewChild('provincia') prov: any
	@ViewChild('municipio') muni: any

	constructor() { }

	ngOnInit() {
		console.log(this.prov.nativeElement)
		new Pselect().create(this.prov.nativeElement, this.muni.nativeElement);
	}
}






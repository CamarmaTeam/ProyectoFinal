import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import Pselect from 'pselect.js'

@Component({
	selector: 'app-p-select',
	templateUrl: './p-select.component.html',
	styleUrls: ['./p-select.component.scss']
})
export class PSelectComponent implements OnInit {
	@ViewChild('provincia') prov: any
	@ViewChild('municipio') muni: any

	@Output() envioProv = new EventEmitter
	@Output() envioMun = new EventEmitter

	provincia: string;
	municipio: string;

	constructor() {
		this.provincia = '';
		this.municipio = '';
	}

	ngOnInit() {
		new Pselect().create(this.prov.nativeElement, this.muni.nativeElement);
	}

	onChangeProv($event){
		this.provincia = $event.target.selectedOptions[0].label
		this.envioProv.emit(this.provincia)
		setTimeout(() => {
			this.municipio = this.muni.nativeElement.selectedOptions[0].label
			this.envioMun.emit(this.municipio)
			console.log(this.municipio)
		}, 100)
	}

	onChangeMun($event){
		this.municipio = $event.target.selectedOptions[0].label
		this.envioMun.emit(this.municipio)
	}
}






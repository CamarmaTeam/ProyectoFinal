import { Component, OnInit, ViewChild, Output, EventEmitter, Input, SimpleChange } from '@angular/core';
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
	@Input() ciudadP: string
	@Input() provinciaP: string
	@Input() tipo:string


	provincia: string;
	municipio: string;

	constructor() {
		this.provincia = '';
		this.municipio = '';
	}

	ngOnInit() {
		console.log(this.tipo)
		if (this.tipo === "vacio") {
			new Pselect().create(this.prov.nativeElement, this.muni.nativeElement)
		}
		
	}

	ngOnChanges(changes: SimpleChange) {

		console.log(this.tipo)
		if (this.tipo == "perfil"){
			console.log('entradndo on changes')
		for (let propName in changes) {
			let chng = changes[propName];
			let cur = JSON.stringify(chng.currentValue);
			let prev = JSON.stringify(chng.previousValue);

			console.log(propName, cur);
			
				if (propName === "provinciaP" && cur !== ""){
				this.provincia = cur
			} 

				if (propName === "ciudadP" && cur !== ""){
				this.municipio = cur
			} 

			new Pselect({
			provText: this.provinciaP,
			munText: this.ciudadP
			}).create(this.prov.nativeElement, this.muni.nativeElement);
		}
		}

		
	
				
			}

			

			

	onChangeProv($event){
		this.provincia = $event.target.selectedOptions[0].label
		this.envioProv.emit(this.provincia)
		setTimeout(() => {
			this.municipio = this.muni.nativeElement.selectedOptions[0].label
			this.envioMun.emit(this.municipio)
			
		}, 100)
	}

	onChangeMun($event){
		this.municipio = $event.target.selectedOptions[0].label
		this.envioMun.emit(this.municipio)
	}
}






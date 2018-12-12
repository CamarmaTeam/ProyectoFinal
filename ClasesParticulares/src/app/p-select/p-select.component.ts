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
	@Input() ciudadBD: string
	@Input() provinciaBD: string
	@Input() tipo:string

	provincia: string;
	municipio: string;

	constructor() {
		// this.provincia = '';
		// this.municipio = '';
	}

	ngOnInit() {
		if (this.tipo === "vacio") {
			new Pselect().create(this.prov.nativeElement, this.muni.nativeElement)
		}
		
	}

	ngOnChanges(changes: SimpleChange) {

		
		if (this.tipo == "perfil"){
			
			for (let propName in changes) {
				let chng = changes[propName];
				let cur = JSON.stringify(chng.currentValue);
				let prev = JSON.stringify(chng.previousValue);

				if (propName === "provinciaBD" && cur !== ""){
					this.provincia = cur
				} 

				if (propName === "ciudadBD" && cur !== ""){
					this.municipio = cur
				} 

				new Pselect({
					provText: this.provinciaBD,
					munText: this.ciudadBD
				}).create(this.prov.nativeElement, this.muni.nativeElement);

				this.envioProv.emit(this.prov.nativeElement.selectedOptions[0].label)
				this.envioMun.emit(this.muni.nativeElement.selectedOptions[0].label)
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






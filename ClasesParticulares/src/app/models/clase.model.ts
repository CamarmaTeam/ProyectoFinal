export class Clase{
	fk_usuarioprofesor: number;
	nombreclase: string;
	rama: string;	
	descripcion: string
	nivel: string;
	foto: string;
	ciudad: string;
	provincia: string;	
	claseIn: boolean;
	claseOut: boolean;

	constructor(values) {

		this.fk_usuarioprofesor = values.fk_usuarioprofesor
		this.nombreclase = values.nombreclase
		this.rama = values.rama
		this.descripcion = values.descripcion
		this.nivel = values.nivel
		this.foto = values.foto
		this.ciudad = values.ciudad
		this.provincia = values.provincia		
		this.claseIn = values.claseIn
		this.claseOut = values.claseOut

	}
}
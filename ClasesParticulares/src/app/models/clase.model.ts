export class Clase{

	nombre: string
	ubicacion: string	
	asignatura: string
	valoracionProfesor: number
	fotoProfesor: string
	pagoWeb: boolean
	telefono: string

	constructor(values) {

		this.nombre = values.nombre
		this.ubicacion = values.ubicacion
		this.asignatura = values.asignatura
		this.valoracionProfesor = values.valoracionProfesor
		this.fotoProfesor = values.fotoProfesor
		this.pagoWeb = values.pagoWeb
		this.telefono = values.telefono

	}
}
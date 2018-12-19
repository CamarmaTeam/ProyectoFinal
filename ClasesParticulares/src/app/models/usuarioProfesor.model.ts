export class UsuarioProfesor{
	nombre: string;
	apellidos: string;
	foto: string;	
	ciudad: string
	provincia: string;
	contrasena: string;
	email: string;
	telefono: number;	
	biografia: string;
	

	constructor(values) {

		this.nombre = values.nombre
		this.apellidos = values.apellidos
		this.foto = values.foto
		this.ciudad = values.ciudad
		this.provincia = values.provincia
		this.contrasena = values.contrasena
		this.email = values.email
		this.telefono = values.telefono		
		this.biografia = values.biografia
	}
}
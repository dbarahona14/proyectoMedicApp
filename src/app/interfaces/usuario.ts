export interface Usuario {
    uid?: string;
    nombre: string;
    apellidos: string;
    rut: string;
    fNac: any; //tipo Date
    email: string; 
    rol: string;
    especialidad: string;
    estado: boolean;
    genero: string;
    telefono: string;
    domicilio: string;
    isEnabled: boolean;
}

export interface Usuario {
    uid?: string;
    nombre: string;
    apellidos: string;
    rut: string;
    fNac: any; //tipo Date
    email: string; 
    rol: string;
    nickName: string;
    especialidad: string;
    estado: boolean;
    acceso: string;
    genero: string;
    telefono: string;
    domicilio: string;
}

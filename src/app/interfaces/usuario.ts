export interface Usuario {
    uid?: string;
    nombre: string;
    apellido: string;
    rut: string;
    fNac: string; //tipo Date
    email: string; 
    rol: string;
    nickName: string;
    especialidad: string;
    estado: boolean;
    acceso: string; //tipo Date
}

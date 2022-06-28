import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdService {

  dato!: string;

  recibeDatos(id: string){
    this.dato = id;
  }

   devuelveDatos(){
    return this.dato;
  }
}

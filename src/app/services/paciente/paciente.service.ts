import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Paciente } from 'src/app/interfaces/paciente';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  
  private dbPath = '/pacientes';
  pacientesRef: AngularFirestoreCollection<Paciente>;

  constructor(private db: AngularFirestore) {
    this.pacientesRef = db.collection(this.dbPath);
  }
  getAll(): AngularFirestoreCollection<Paciente> {
    return this.pacientesRef;
  }
  getPaciente(id: string) {
    return this.pacientesRef.doc(id);
  }
  create(paciente: Paciente): any {
    return this.pacientesRef.add({ ...paciente });
  }
  update(id: string, data: any): Promise<void> {
    return this.pacientesRef.doc(id).update(data);
  }
  delete(id: string): Promise<void> {
    return this.pacientesRef.doc(id).delete();
  }
}

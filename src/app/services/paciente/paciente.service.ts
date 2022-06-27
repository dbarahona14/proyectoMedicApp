import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Paciente } from 'src/app/interfaces/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  
  private dbPath = '/pacientes';
  tutorialsRef: AngularFirestoreCollection<Paciente>;
  constructor(private db: AngularFirestore) {
    this.tutorialsRef = db.collection(this.dbPath);
  }
  getAll(): AngularFirestoreCollection<Paciente> {
    return this.tutorialsRef;
  }
  create(paciente: Paciente): any {
    return this.tutorialsRef.add({ ...paciente });
  }
  update(id: string, data: any): Promise<void> {
    return this.tutorialsRef.doc(id).update(data);
  }
  delete(id: string): Promise<void> {
    return this.tutorialsRef.doc(id).delete();
  }
}

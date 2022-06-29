import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FichaClinica } from 'src/app/interfaces/ficha-clinica';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  fichasRef: AngularFirestoreCollection<FichaClinica>;

  constructor(private db: AngularFirestore) {
  }
  getAll(pacienteId: string): AngularFirestoreCollection<FichaClinica> {
    this.fichasRef = this.db.collection('/pacientes/'+pacienteId+'/historial');
    return this.fichasRef;
  }
  getFicha(pacienteId: string, id: string) {
    this.fichasRef = this.db.collection('/pacientes/'+pacienteId+'/historial');
    return this.fichasRef.doc(id);
  }
  create(pacienteId: string, ficha: FichaClinica): any {
    this.fichasRef = this.db.collection('/pacientes/'+pacienteId+'/historial');
    return this.fichasRef.add({ ...ficha });
  }
  update(pacienteId: string, id: string, data: any): Promise<void> {
    this.fichasRef = this.db.collection('/pacientes/'+pacienteId+'/historial');
    return this.fichasRef.doc(id).update(data);
  }
  delete(pacienteId: string, id: string): Promise<void> {
    this.fichasRef = this.db.collection('/pacientes/'+pacienteId+'/historial');
    return this.fichasRef.doc(id).delete();
  }
}

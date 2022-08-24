import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FichaClinica } from 'src/app/interfaces/ficha-clinica';
import { ITimelineBox } from '../../interfaces/ficha-clinica';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  fichasRef: AngularFirestoreCollection<ITimelineBox>;

  constructor(private db: AngularFirestore) {
  }
  getAll(pacienteId: string): AngularFirestoreCollection<ITimelineBox> {
    this.fichasRef = this.db.collection('pacientes').doc(pacienteId).collection('historial', ref => ref.orderBy('fecha', 'desc').limit(8));
    return this.fichasRef;
  }
  getFicha(pacienteId: string, id: string) {
    this.fichasRef = this.db.collection('pacientes').doc(pacienteId).collection('historial');
    return this.fichasRef.doc(id);
  }
  create(pacienteId: string, historial: ITimelineBox): any {
    this.fichasRef = this.db.collection('pacientes').doc(pacienteId).collection('historial');
    return this.fichasRef.add({ ...historial});
  }
  update(pacienteId: string, id: string, data: any): Promise<void> {
    this.fichasRef = this.db.collection('pacientes').doc(pacienteId).collection('historial');
    return this.fichasRef.doc(id).update(data);
  }
  delete(pacienteId: string, id: string): Promise<void> {
    this.fichasRef = this.db.collection('pacientes').doc(pacienteId).collection('historial');
    return this.fichasRef.doc(id).delete();
  }
}

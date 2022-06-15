import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from 'src/app/interfaces/usuario';


@Injectable({
  providedIn: 'root'
})
export class CrudUsuarioService {

  private dbPath = '/usuario';
  tutorialsRef: AngularFirestoreCollection<Usuario>;
  constructor(private db: AngularFirestore) {
    this.tutorialsRef = db.collection(this.dbPath);
  }
  getAll(): AngularFirestoreCollection<Usuario> {
    return this.tutorialsRef;
  }
  create(usuario: Usuario): any {
    return this.tutorialsRef.add({ ...usuario });
  }
  update(id: string, data: any): Promise<void> {
    return this.tutorialsRef.doc(id).update(data);
  }
  delete(id: string): Promise<void> {
    return this.tutorialsRef.doc(id).delete();
  }
}

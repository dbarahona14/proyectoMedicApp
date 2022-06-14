import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _auth : AngularFireAuth) { }

  async login(email: string, password: string){
    try {
      return await this._auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
        alert("No se ha podido hacer el login correctamente. Error: "+ error);
        console.log("Error al hacer el login!!! Error: " + error);
        return null;
    }
  }
}

import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from 'src/app/interfaces/usuario';
import { CrudUsuarioService } from '../usuario/crud-usuario.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _auth: AngularFireAuth, private usuarioService: CrudUsuarioService, private ngZone: NgZone, private router: Router) {}

  login( email: string, password:string ) {
    return this._auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.usuarioService.getUserById(result.user.uid).get().subscribe(data =>{
          localStorage.setItem('userData', JSON.stringify(data.data()));
          this.router.navigate(['vertical/default-dashboard']);
        });
        localStorage.setItem('user', JSON.stringify(result.user));
        // this.ngZone.run(() => {
        //   this.router.navigate(['vertical/default-dashboard']);
        // });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  register(email: string, password: string ) {
    return this._auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    localStorage.clear();
    return this._auth.signOut();
  }
}

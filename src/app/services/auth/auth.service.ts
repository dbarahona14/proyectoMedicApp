import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CrudUsuarioService } from '../usuario/crud-usuario.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { updateProfile } from '@firebase/auth';
import { NotificationService } from 'src/app/services/notification/notification.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _auth: AngularFireAuth,
    private usuarioService: CrudUsuarioService,
    private ngZone: NgZone,
    private router: Router,
    private notificationService: NotificationService) { }

  login(email: string, password: string) {
    return this._auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.usuarioService.getUserById(result.user.uid).get().subscribe(data => {
          localStorage.setItem('userData', JSON.stringify(data.data()));
          this.router.navigate(['vertical/default-dashboard']);
        });
        localStorage.setItem('user', JSON.stringify(result.user));
        // this.ngZone.run(() => {
        //   this.router.navigate(['vertical/default-dashboard']);
        // });
      },
        err => {
          // window.alert(err.message);
          const mensajeError = err.message;
          if (mensajeError.includes("user-disabled")) {
            this.notificationService.showInfo("Usuario deshabilitado", "Su usuario está deshabilitado.");
          }
          else if (err.message.includes("user-not-found")) {
            this.notificationService.showError("Usuario no encontrado", "No existe un usuario asociado al email ingresado");
          }
          else if (err.message.includes("wrong-password")) {
            this.notificationService.showError("Contraseña incorrecta", "Ha ingresado una contraseña incorrecta");
          }
          else {
            this.notificationService.showError(err.message, "Error");
          }
        });
  }

  register(email: string, password: string) {
    return this._auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    localStorage.clear();
    return this._auth.signOut();
  }

  changePassword(newPass: string) {
    return this._auth.currentUser.then(res => {
      res.updatePassword(newPass).then(res => {
        this.notificationService.showSuccess("Contraseña actualizada", "Su contraseña ha sido actualizada correctamente");
      }).catch(err => {
        const mensajeError = err.message;
        if (mensajeError.includes("requires-recent-login")) {
          this.notificationService.showError("Reingresar", "Para cambiar contraseña debe tener una sesión activa recientemente");
        }
        else {
          this.notificationService.showError("Error", "Intente más tarde");
        }
      });
    });
  }
}

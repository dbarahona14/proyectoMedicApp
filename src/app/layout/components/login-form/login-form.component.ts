import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';


@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      pass: ['', Validators.required]
    });
  }

  logIn() {
    var email = this.loginForm.get('login').value;
    var pass = this.loginForm.get('pass').value;

    if (email && pass != "") {
      this._auth.login(email, pass).then(()=>{
        this.loginForm.reset();
      });
      
    }
    else {
      console.log('Favor, rellenar campos requeridos para iniciar sesión.');
      if (email == "" && pass != "") {
        this.notificationService.showError('Error', 'Ingrese correo');
        // alert('Ingrese correo.');
      }
      else if (email != "" && pass == "") {
        this.notificationService.showError('Error', 'Ingrese contraseña');
        // alert('Ingrese contraseña.');
      }
      else {
        this.notificationService.showError('Error', 'Ingrese correo y contraseña');
        // alert('Ingrese correo y contraseña.');
      }
    }

  }

}

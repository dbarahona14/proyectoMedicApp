import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      pass: ['', Validators.required]
    });
  }

  logIn(){
    var email = this.loginForm.get('login').value;
    var pass = this.loginForm.get('pass').value;
    this._auth.login(email, pass).then (res=> {
      console.log(res);
      console.log('Usuario logeado!');
      //Aquí redireccionar a página inicial
      this._router.navigate(['/vertical/default-dashboard']);
    });
  }

}

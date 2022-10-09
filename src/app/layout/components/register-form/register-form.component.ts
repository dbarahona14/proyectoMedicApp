import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DecimationAlgorithm } from 'chart.js';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CrudUsuarioService } from 'src/app/services/usuario/crud-usuario.service';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;

  pass: string = '123456';

  uid?: string;

  constructor(private fb: FormBuilder, private db: CrudUsuarioService, private auth: AuthService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required]
    });
  }

  registrar(){
    
  }

  // registrar(){
  //   var mail = this.usuario.email;
  //   var contra = this.pass;
  //   this.auth.register(mail, contra).then(res =>{

  //     console.log("El uid es: " + res.user.uid);
  //     this.usuario.uid = res.user.uid;
  //     this.db.createWithId(this.usuario, res.user.uid).then(() => {
  //       console.log('Created new user successfully!');
  //       alert('Se creó el usuario correctamente! :)');
  //     });
  //   });
  // }
}

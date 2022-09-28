import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasePageComponent } from '../../../base-page';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../interfaces/app-state';
import { HttpService } from '../../../../services/http/http.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { IOption } from '../../../../ui/interfaces/option';
import { Usuario } from 'src/app/interfaces/usuario';
import { CrudUsuarioService } from 'src/app/services/usuario/crud-usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'page-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class PageEditAccountComponent extends BasePageComponent implements OnInit, OnDestroy {
  userInfo: any;
  userForm: FormGroup;
  passForm: FormGroup;
  gender: IOption[];
  status: IOption[];
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;
  changes: boolean;

  currentUser: Usuario;

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private formBuilder: FormBuilder,
    private userService: CrudUsuarioService,
    private actRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router,
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Editar cuenta',
      loaded: true,
      breadcrumbs: [
        {
          title: 'Inicio',
          route: 'default-dashboard'
        },
        // {
        //   title: 'Service pages',
        //   route: 'default-dashboard'
        // },
        {
          title: 'Editar cuenta'
        }
      ]
    };
    this.gender = [
      {
        label: 'Hombre',
        value: 'hombre'
      },
      {
        label: 'Mujer',
        value: 'mujer'
      }
    ];
    this.status = [
      {
        label: 'Approved',
        value: 'approved'
      },
      {
        label: 'Pending',
        value: 'pending'
      }
    ];
    this.defaultAvatar = 'assets/content/anonymous-400.jpg';
    this.currentAvatar = this.defaultAvatar;
    this.changes = false;

  }

  ngOnInit() {
    super.ngOnInit();
    this.actRoute.params
      .subscribe(({ id }) => {
        this.obtenerUsuario(id);
      });

    // this.getData('assets/data/account-data.json', 'userInfo', 'loadedDetect');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  loadedDetect() {
    this.setLoaded();

    //this.currentAvatar = this.userInfo.img;
    this.initUserForm(this.currentUser);
    this.initPassForm();
  }

  // init form
  initUserForm(data: Usuario) {
    var edad = this.calcularEdad(data.fNac.toDate());
    this.userForm = this.formBuilder.group({
      //img: [this.currentAvatar],
      nombre: [data.nombre, Validators.required],
      apellidos: [data.apellidos, Validators.required],
      rut: [data.rut, [Validators.required, Validators.maxLength(12), Validators.pattern(/^[0-9]+-[0-9kK]{1}|(((\d{2})|(\d{1})).\d{3}\.\d{3}-)([0-9kK]){1}$/), this.checkVerificatorDigit]],
      telefono: [data.telefono, Validators.required],
      domicilio: [data.domicilio, Validators.required],
      genero: [data.genero ? data.genero.toLowerCase() : '', Validators.required],
      fNac: [data.fNac.toDate(), Validators.required],
      email: [data.email, Validators.required],
      edad: [edad, Validators.required],
      // lastVisit: [data.lastVisit, Validators.required],
      // status: [data.status, Validators.required]
    });

    // detect form changes
    this.userForm.valueChanges.subscribe(() => {
      this.changes = true;
    });
  }

  initPassForm() {
    this.passForm = this.formBuilder.group({
      pass: ['', Validators.required],
      confirmPass: ['', Validators.required]
    });
  }

  calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }

    return edad;
  }

  // save form data
  saveData(form: FormGroup) {
    if (form.valid) {
      this.userInfo = form.value;
      this.userService.update(this.currentUser.uid, this.userInfo).then(res => {
        this.notificationService.showSuccess('Actualizado', 'Perfil actualizado correctamente');
      }).catch(err => {
        this.notificationService.showError('Error', 'Error al actualizar');
      });
      this.changes = false;
    }
  }

  // upload new file
  onFileChanged(inputValue: any) {
    let file: File = inputValue.target.files[0];
    let reader: FileReader = new FileReader();

    reader.onloadend = () => {
      this.currentAvatar = reader.result;
      this.changes = true;
    };

    reader.readAsDataURL(file);
  }

  obtenerUsuario(id: string) {
    var paciente = this.userService.getUserById(id);
    paciente.snapshotChanges().subscribe(datos => {
      this.currentUser = datos.payload.data();
      if (this.currentUser.genero === 'hombre') {
        this.currentAvatar = 'assets/content/male-icon.png';
      }
      else {
        this.currentAvatar = 'assets/content/female-icon.png';
      }
      this.loadedDetect();

    });
  }

  checkVerificatorDigit(control: AbstractControl) {
    let run = control;
    if (run.value == null || run.value == "") return null;

    //Limpiar run de puntos y guión
    var runClean = run.value.replace(/[^0-9kK]+/g, '').toUpperCase();

    // Aislar Cuerpo y Dígito Verificador
    let body = runClean.slice(0, -1);
    let dv = runClean.slice(-1).toUpperCase();

    // Calcular Dígito Verificador
    let suma = 0;
    let multiplo = 2;

    // Para cada dígito del Cuerpo
    for (let i = 1; i <= body.length; i++) {
      // Obtener su Producto con el Múltiplo Correspondiente
      let index = multiplo * runClean.charAt(body.length - i);
      // Sumar al Contador General
      suma = suma + index;
      // Consolidar Múltiplo dentro del rango [2,7]
      if (multiplo < 7) {
        multiplo = multiplo + 1;
      } else {
        multiplo = 2;
      }
    }

    // Calcular Dígito Verificador en base al Módulo 11
    let dvEsperado = 11 - (suma % 11);

    // Casos Especiales (0 y K)
    dv = (dv == 'K') ? 10 : dv;
    dv = (dv == 0) ? 11 : dv;

    // Validar que el Cuerpo coincide con su Dígito Verificador
    if (dvEsperado != dv) {
      return { verificator: true };
    }
    else null;
  }

  checkRun() {
    let run = this.f['rut'];
    if (run) {
      console.log(run.value);
      var runClean = run.value.replace(/[^0-9kK]+/g, '').toUpperCase();
      if (runClean.length <= 1) {
        return;
      }
      var result = runClean.slice(-4, -1) + "-" + runClean.substr(runClean.length - 1);
      for (var i = 4; i < runClean.length; i += 3) {
        result = runClean.slice(-3 - i, -i) + "." + result;
      }
      run.setValue(result);

    }
  }

  get f() { return this.userForm.controls; }

  get fValue() { return this.userForm.value; }

  updatePassword() {
    let pass = this.passForm.get('pass').value;
    let confirmPass = this.passForm.get('confirmPass').value;

    if (pass == confirmPass) {
      this.authService.changePassword(confirmPass).then(res => {

      }).finally(() => {
        this.authService.logout();
        this.router.navigate(['../public/sign-in/']);
      });
    }

    else {
      this.notificationService.showError("Error", "Las contraseñas no coinciden");
    }
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

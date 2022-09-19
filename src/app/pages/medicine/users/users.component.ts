import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { BasePageComponent } from '../../base-page';
import { IAppState } from '../../../interfaces/app-state';
import { HttpService } from '../../../services/http/http.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOption } from '../../../ui/interfaces/option';
import { Content } from '../../../ui/interfaces/modal';
import * as PatientsActions from '../../../store/actions/patients.actions';
import { TCModalService } from '../../../ui/services/modal/modal.service';
import { map } from 'rxjs/operators';
import { IdService } from 'src/app/services/idService/id.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { CrudUsuarioService } from 'src/app/services/usuario/crud-usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends BasePageComponent implements OnInit, OnDestroy {

  usuarios: Usuario[];
  userForm: FormGroup;
  gender: IOption[];
  status: IOption[];
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;

  usuarioActivo: Usuario;

  edad: any;

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private fb: FormBuilder,
    private modal: TCModalService,
    private usersService: CrudUsuarioService,
    private idService: IdService,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Lista de usuarios',
      breadcrumbs: [
        {
          title: 'Inicio',
          route: 'default-dashboard'
        },
        {
          title: 'Lista de usuarios'
        }
      ]
    };
    this.usuarios = [];
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
    //this.currentAvatar = this.defaultAvatar;
  }

  ngOnInit() {
    super.ngOnInit();

    this.usersService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      if (data && data.length) {
        this.usuarios = data;

        !this.pageData.loaded ? this.setLoaded() : null;
      }
    });

    this.usuarioActivo = JSON.parse(localStorage.getItem('userData'));

    // this.store.select('patients').subscribe(patients => {
    //   if (patients && patients.length) {
    //     this.patients = patients;

    //     !this.pageData.loaded ? this.setLoaded() : null;
    //   }
    // });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  // delete patient
  remove(id: string) {
    this.store.dispatch(new PatientsActions.Delete(id));
  }

  // open modal window
  openModal<T>(body: Content<T>, header: Content<T> = null, footer: Content<T> = null, row: Usuario) {
    this.initUserForm(row);

    this.modal.open({
      body: body,
      header: header,
      footer: footer,
      options: null
    });
  }

  openModalTwo<T>(body: Content<T> = null, header: Content<T> = null, footer: Content<T> = null) {
    this.modal.open({
      body: body,
      header: header,
      footer: footer,
      options: null
    });
  }

  // close modal window
  closeModal() {
    this.modal.close();
    //this.patientForm.reset();
    //this.currentAvatar = this.defaultAvatar;
  }

  // upload new file
  onFileChanged(inputValue: any) {
    let file: File = inputValue.target.files[0];
    let reader: FileReader = new FileReader();

    reader.onloadend = () => {
      this.currentAvatar = reader.result;
    };

    reader.readAsDataURL(file);
  }

  // init form
  initUserForm(data: Usuario) {
    // this.currentAvatar = data.img ? data.img : this.defaultAvatar;
    this.edad = this.calcularEdad(data.fNac.toDate());
    this.userForm = this.fb.group({
      id: data.uid,
      img: [this.currentAvatar],
      nombre: [data.nombre ? data.nombre : '', Validators.required],
      rut: [data.rut? data.rut : '', [Validators.required, Validators.maxLength(12), Validators.pattern(/^[0-9]+-[0-9kK]{1}|(((\d{2})|(\d{1})).\d{3}\.\d{3}-)([0-9kK]){1}$/), this.checkVerificatorDigit]],
      fNac: [data.fNac? data.fNac.toDate(): '', Validators.required],
      email: [data.email? data.email : '', Validators.required],
      telefono: [data.telefono ? data.telefono : '', Validators.required],
      edad: [this.edad ? this.edad : '', Validators.required],
      // lastVisit: [data.lastVisit ? data.lastVisit : '', Validators.required],
      genero: [data.genero ? data.genero.toLowerCase() : '', Validators.required],
      domicilio: [data.domicilio ? data.domicilio : '', Validators.required],
      // status: [data.status ? data.status.toLowerCase() : '', Validators.required]
    });

    if (data.genero === 'hombre') {
      this.currentAvatar = 'assets/content/male-icon.png';
    }
    else {
      this.currentAvatar = 'assets/content/female-icon.png';
    }
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

  // update patient
  updateUser(form: FormGroup) {
    if (form.valid) {
      let newUser: Usuario = form.value;

      this.usersService.update(newUser.uid, newUser).then( () =>{
        this.notificationService.showSuccess('Listo', 'Actualización realizada correctamente')
        //console.log('Paciente actualizado con éxito!!!')
      });
      // this.store.dispatch(new PatientsActions.Edit(newPatient));
      this.closeModal();
      this.userForm.reset();
    }
  }

  cambiarId( id: string){
    this.idService.recibeDatos(id);
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
    if(run){
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

  cambiarEstado(estado: boolean){}
}

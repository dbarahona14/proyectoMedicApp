import { Component, ElementRef, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { IAppState } from '../../interfaces/app-state';
import { BaseLayoutComponent } from '../base-layout/base-layout.component';
import { HttpService } from '../../services/http/http.service';
import { IOption } from '../../ui/interfaces/option';
import { Content } from '../../ui/interfaces/modal';
import { TCModalService } from '../../ui/services/modal/modal.service';
import * as PatientsActions from '../../store/actions/patients.actions';
import * as SettingsActions from '../../store/actions/app-settings.actions';
import { Paciente } from 'src/app/interfaces/paciente';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { map } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { getStorage } from '@angular/fire/storage';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { CrudUsuarioService } from 'src/app/services/usuario/crud-usuario.service';

@Component({
  selector: 'vertical-layout',
  templateUrl: './vertical.component.html',
  styleUrls: [
    '../base-layout/base-layout.component.scss',
    './vertical.component.scss'
  ]
})
export class VerticalLayoutComponent extends BaseLayoutComponent implements OnInit {
  patientForm: FormGroup;
  searchForm: FormGroup;
  userForm: FormGroup;
  gender: IOption[];
  rol: IOption[];
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;
  formActive: string;

  usuarioActivo: Usuario;


  data: Paciente[] = [];
  @Input() layout: string;

  constructor(
    store: Store<IAppState>,
    fb: FormBuilder,
    httpSv: HttpService,
    router: Router,
    elRef: ElementRef,
    private modal: TCModalService,
    private pacienteService: PacienteService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private userService: CrudUsuarioService,
  ) {
    super(store, fb, httpSv, router, elRef);

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

    this.rol = [
      {
        label: 'Administrador',
        value: 'administrador'
      },
      {
        label: 'Funcionario',
        value: 'funcionario'
      }
    ];
    this.defaultAvatar = 'assets/content/anonymous-400.jpg';
    this.currentAvatar = this.defaultAvatar;

  }

  ngOnInit() {
    super.ngOnInit();
    this.store.dispatch(new SettingsActions.Update({ layout: 'vertical' }));
    this.usuarioActivo = JSON.parse(localStorage.getItem('userData'));
    this.llenarData();
  }

  // open modal window
  openModal<T>(body: Content<T>, header: Content<T> = null, footer: Content<T> = null, options: any = null) {
    this.formActive = 'patient';
    this.initPatientForm();
    this.initSearchForm();

    this.modal.open({
      header: header,
      footer: footer,
      options: options,
      body: body,
    });
  }

  openModalTwo<T>(body: Content<T>, header: Content<T> = null, footer: Content<T> = null, options: any = null) {
    this.formActive = 'user';
    this.initUserForm();
    this.modal.open({
      header: header,
      footer: footer,
      options: options,
      body: body,
    });
  }

  // close modal window
  closeModalPatient() {
    this.modal.close();
    this.patientForm.reset();
    //this.currentAvatar = this.defaultAvatar;
  }

  closeModalSearch(){
    this.modal.close();
    this.searchForm.reset();
  }

  closeModalUser(){
    this.modal.close();
    this.userForm.reset();
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
  initPatientForm() {
    this.patientForm = this.fb.group({
      img: [],
      nombre: ['', Validators.required],
      correo: [''],
      fNac: [Validators.required],
      rut: ['', [Validators.required, Validators.maxLength(12), Validators.pattern(/^[0-9]+-[0-9kK]{1}|(((\d{2})|(\d{1})).\d{3}\.\d{3}-)([0-9kK]){1}$/), this.checkVerificatorDigit]],
      telefono: [''],
      edad: ['', Validators.required],
      genero: ['', Validators.required],
      domicilio: ['', Validators.required],
      alergias: ['Sin alergias.', Validators.required],
      antMorbidos: ['Sin antecedentes mórbidos.', Validators.required]
    });
  }

  initUserForm() {
    this.userForm = this.fb.group({
      //img: [this.currentAvatar],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      rut: ['', [Validators.required, Validators.maxLength(12), Validators.pattern(/^[0-9]+-[0-9kK]{1}|(((\d{2})|(\d{1})).\d{3}\.\d{3}-)([0-9kK]){1}$/), this.checkVerificatorDigit]],
      telefono: ['', Validators.required],
      domicilio: ['', Validators.required],
      genero: ['', Validators.required],
      fNac: [Validators.required],
      email: ['', Validators.required],
      especialidad: ['', Validators.required],
      rol: ['', Validators.required],
      // lastVisit: [data.lastVisit, Validators.required],
      // status: [data.status, Validators.required]
    });
  }

  // add new patient
  addPatient(form: FormGroup) {
    if (form.valid) {
      let newPatient: Paciente = form.value;
      let nomRut: string;

      nomRut = newPatient.rut  + (' ') + form.get('nombre').value;
      newPatient.nombreRut = nomRut;
      // newPatient.apellido = form.get('name').value;
      // newPatient.correo = form.get('email').value;
      // newPatient.status = 'Pending';
      // newPatient.lastVisit = '';

      // this.store.dispatch(new PatientsActions.Add(newPatient));
      this.agregarPaciente(newPatient);
      this.closeModalPatient();
      this.patientForm.reset();
    }
  }

  goTo(event: Event, value: string) {
    if (value) {
      let currentPage;

      currentPage = this.data.find(item => {
        return item.nombreRut === value;
      });
      
      if (currentPage) {
        this.router.navigate(['./vertical/patient-profile/', currentPage.id]);
        this.closeModalSearch();
      }
    }
  }

  agregarPaciente(paciente : Paciente){
    this.pacienteService.create(paciente).then (res =>{
      paciente.id = res.id;
      this.pacienteService.update(res.id, paciente).then (res => {
        this.notificationService.showSuccess('Listo', 'Paciente agregado correctamente');
      });
    });
  }

  llenarData(): void {
    this.pacienteService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.data = data;
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
    if(run){
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

  get f() { 
    if(this.formActive == 'patient'){
      return this.patientForm.controls;
    } else {
      return this.userForm.controls; 
    }
  }
  // get fValue() { return this.patientForm.value; }

  registrar(form: FormGroup){

    var mail = form.get('email').value;
    var contra = form.get('rut').value;
    var usuario: Usuario = form.value;
    usuario.isEnabled = true;
    this.authService.register(mail, contra).then(res =>{
      res.user.sendEmailVerification();
      //console.log("El uid es: " + res.user.uid);
      usuario.uid = res.user.uid;
      this.userService.createWithId(usuario, res.user.uid).then(() => {
        this.notificationService.showSuccess('Usuario agregado', 'Se ha creado el usuario correctamente');
        // console.log('Created new user successfully!');
        // alert('Se creó el usuario correctamente! :)');
      }).catch(err =>{
        this.notificationService.showError('Error', 'Usuario no agregado correctamente');
        console.log(err);
      });
    });

    this.closeModalUser();
    this.patientForm.reset();
  }

  // handleDateOpenChange(open: boolean): void {
  //   if (open) {
  //     this.dateMode = 'time';
  //   }
  // }

  // handleDatePanelChange(mode: string): void { }
}

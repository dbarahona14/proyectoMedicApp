import { Component, ModuleWithComponentFactories, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { BasePageComponent } from '../../base-page';
import { IAppState } from '../../../interfaces/app-state';
import { HttpService } from '../../../services/http/http.service';
import { IPatient } from '../../../interfaces/patient';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOption } from '../../../ui/interfaces/option';
import { Content } from '../../../ui/interfaces/modal';
import * as PatientsActions from '../../../store/actions/patients.actions';
import { TCModalService } from '../../../ui/services/modal/modal.service';
import { Paciente } from 'src/app/interfaces/paciente';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { map } from 'rxjs/operators';
import { IdService } from 'src/app/services/idService/id.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'page-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PagePatientsComponent extends BasePageComponent implements OnInit, OnDestroy {
  patients: Paciente[];
  patientForm: FormGroup;
  gender: IOption[];
  status: IOption[];
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private fb: FormBuilder,
    private modal: TCModalService,
    private pacienteService: PacienteService,
    private idService: IdService,
    private notificationService: NotificationService
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Lista de pacientes',
      breadcrumbs: [
        {
          title: 'Inicio',
          route: 'default-dashboard'
        },
        {
          title: 'Lista de pacientes'
        }
      ]
    };
    this.patients = [];
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

    this.pacienteService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      if (data && data.length) {
        this.patients = data;

        !this.pageData.loaded ? this.setLoaded() : null;
      }
    });

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
  openModal<T>(body: Content<T>, header: Content<T> = null, footer: Content<T> = null, row: Paciente) {
    this.initPatientForm(row);

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
  initPatientForm(data: Paciente) {
    // this.currentAvatar = data.img ? data.img : this.defaultAvatar;

    this.patientForm = this.fb.group({
      id: data.id,
      img: [this.currentAvatar],
      nombre: [data.nombre ? data.nombre : '', Validators.required],
      rut: [data.rut? data.rut : '', [Validators.required, Validators.maxLength(12), Validators.pattern(/^[0-9]+-[0-9kK]{1}|(((\d{2})|(\d{1})).\d{3}\.\d{3}-)([0-9kK]){1}$/), this.checkVerificatorDigit]],
      fNac: [data.fNac? data.fNac.toDate(): '', Validators.required],
      email: [data.correo? data.correo : '', Validators.required],
      telefono: [data.telefono ? data.telefono : '', Validators.required],
      edad: [data.edad ? data.edad : '', Validators.required],
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

  // update patient
  updatePatient(form: FormGroup) {
    if (form.valid) {
      let newPatient: Paciente = form.value;

      this.pacienteService.update(newPatient.id, newPatient).then( () =>{
        this.notificationService.showSuccess('Listo', 'Actualización de realizada correctamente')
        //console.log('Paciente actualizado con éxito!!!')
      });
      // this.store.dispatch(new PatientsActions.Edit(newPatient));
      this.closeModal();
      this.patientForm.reset();
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

  get f() { return this.patientForm.controls; }

  get fValue() { return this.patientForm.value; }
}

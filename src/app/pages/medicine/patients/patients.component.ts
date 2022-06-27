import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { BasePageComponent } from '../../base-page';
import { IAppState } from '../../../interfaces/app-state';
import { HttpService } from '../../../services/http/http.service';
import { IPatient } from '../../../interfaces/patient';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOption } from '../../../ui/interfaces/option';
import { Content } from '../../../ui/interfaces/modal';
import * as PatientsActions from '../../../store/actions/patients.actions';
import { TCModalService } from '../../../ui/services/modal/modal.service';
import { Paciente } from 'src/app/interfaces/paciente';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { map } from 'rxjs/operators';

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
    private pacienteService: PacienteService
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
    this.currentAvatar = this.defaultAvatar;
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
    this.patientForm.reset();
    this.currentAvatar = this.defaultAvatar;
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
      rut: [data.rut? data.rut : '', Validators.required],
      telefono: [data.telefono ? data.telefono : '', Validators.required],
      edad: [data.edad ? data.edad : '', Validators.required],
      // lastVisit: [data.lastVisit ? data.lastVisit : '', Validators.required],
      genero: [data.genero ? data.genero.toLowerCase() : '', Validators.required],
      domicilio: [data.domicilio ? data.domicilio : '', Validators.required],
      // status: [data.status ? data.status.toLowerCase() : '', Validators.required]
    });
  }

  // update patient
  updatePatient(form: FormGroup) {
    if (form.valid) {
      let newPatient: Paciente = form.value;

      this.pacienteService.update(newPatient.id, newPatient).then( () =>{
        console.log('Paciente actualizado con éxito!!!')
      });
      // this.store.dispatch(new PatientsActions.Edit(newPatient));
      this.closeModal();
      this.patientForm.reset();
    }
  }
}

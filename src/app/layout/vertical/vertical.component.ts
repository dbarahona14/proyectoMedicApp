import { Component, ElementRef, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { IAppState } from '../../interfaces/app-state';
import { BaseLayoutComponent } from '../base-layout/base-layout.component';
import { HttpService } from '../../services/http/http.service';
import { IOption } from '../../ui/interfaces/option';
import { Content } from '../../ui/interfaces/modal';
import { TCModalService } from '../../ui/services/modal/modal.service';
import { IPatient } from '../../interfaces/patient';
import * as PatientsActions from '../../store/actions/patients.actions';
import * as SettingsActions from '../../store/actions/app-settings.actions';
import { CrudUsuarioService } from 'src/app/services/usuario/crud-usuario.service';
import { Paciente } from 'src/app/interfaces/paciente';
import { PacienteService } from 'src/app/services/paciente/paciente.service';

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
  gender: IOption[];
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;


  data: IPatient[] = [];
  @Input() layout: string;

  constructor(
    store: Store<IAppState>,
    fb: FormBuilder,
    httpSv: HttpService,
    router: Router,
    elRef: ElementRef,
    private modal: TCModalService,
    private pacienteService: PacienteService
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
    this.defaultAvatar = 'assets/content/anonymous-400.jpg';
    this.currentAvatar = this.defaultAvatar;
  }

  ngOnInit() {
    super.ngOnInit();

    this.store.dispatch(new SettingsActions.Update({ layout: 'vertical' }));
  }

  // open modal window
  openModal<T>(body: Content<T>, header: Content<T> = null, footer: Content<T> = null, options: any = null) {
    this.initPatientForm();

    this.modal.open({
      body: body,
      header: header,
      footer: footer,
      options: options
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
  initPatientForm() {
    this.patientForm = this.fb.group({
      img: [],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      edad: ['', Validators.required],
      genero: ['', Validators.required],
      direccion: ['', Validators.required],
    });
  }

  // add new patient
  addPatient(form: FormGroup) {
    if (form.valid) {
      let newPatient: Paciente = form.value;

      newPatient.correo = 'diegob95@outlook.com';
      newPatient.fNac = new Date(1995,2,20);
      newPatient.rut = '18.988.397-8';
      // newPatient.apellido = form.get('name').value;
      // newPatient.correo = form.get('email').value;
      // newPatient.status = 'Pending';
      // newPatient.lastVisit = '';

      // this.store.dispatch(new PatientsActions.Add(newPatient));
      this.agregarPaciente(newPatient);
      this.closeModal();
      this.patientForm.reset();
    }
  }

  goTo(event: Event, value: string) {
    if (value) {
      let currentPage;

      currentPage = this.data.find(item => {
        return item.id === value;
      });

      if (currentPage && currentPage.routing) {
        this.router.navigate([currentPage.layout ? currentPage.layout : this.layout, 'patients']);
      }
    }
  }

  agregarPaciente(paciente : Paciente){
    this.pacienteService.create(paciente).then (res =>{
      console.log('Paciente agregado correctamente!!!');
    });
  }
}

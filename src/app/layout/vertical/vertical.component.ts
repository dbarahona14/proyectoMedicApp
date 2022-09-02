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
import * as PatientsActions from '../../store/actions/patients.actions';
import * as SettingsActions from '../../store/actions/app-settings.actions';
import { Paciente } from 'src/app/interfaces/paciente';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { map } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { getStorage } from '@angular/fire/storage';

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
  gender: IOption[];
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;


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
    private notificationService: NotificationService
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

    this.llenarData();
  }

  // open modal window
  openModal<T>(body: Content<T>, header: Content<T> = null, footer: Content<T> = null, options: any = null) {
    this.initPatientForm();
    this.initSearchForm();

    this.modal.open({
      header: header,
      footer: footer,
      options: options,
      body: body,
    });
  }

  // close modal window
  closeModal() {
    this.modal.close();
    this.patientForm.reset();
    this.searchForm.reset();
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
      correo: ['', Validators.required],
      fNac: [],
      rut: ['', Validators.required],
      telefono: ['', Validators.required],
      edad: ['', Validators.required],
      genero: ['', Validators.required],
      domicilio: ['', Validators.required],
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
      this.closeModal();
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
        this.closeModal();
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

  // handleDateOpenChange(open: boolean): void {
  //   if (open) {
  //     this.dateMode = 'time';
  //   }
  // }

  // handleDatePanelChange(mode: string): void { }
}

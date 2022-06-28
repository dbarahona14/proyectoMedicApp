import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { BasePageComponent } from '../../base-page';
import { IAppState } from '../../../interfaces/app-state';
import { HttpService } from '../../../services/http/http.service';
import { IOption } from '../../../ui/interfaces/option';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { Paciente } from 'src/app/interfaces/paciente';
import { IdService } from 'src/app/services/idService/id.service';

@Component({
  selector: 'page-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PagePatientProfileComponent extends BasePageComponent implements OnInit, OnDestroy {
  patientInfo: any;
  patientTimeline: any;
  patientForm: FormGroup;
  gender: IOption[];
  status: IOption[];
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;
  changes: boolean;
  billings: any[];

  idPaciente: string;

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private formBuilder: FormBuilder,
    private pacienteService: PacienteService,
    private idService: IdService,
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Patient profile page',
      breadcrumbs: [
        {
          title: 'Medicine',
          route: 'default-dashboard'
        },
        {
          title: 'Patients',
          route: 'patients'
        },
        {
          title: 'Dr. Sophie'
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
    this.billings = [];
  }

  ngOnInit() {
    super.ngOnInit();

    //this.getData('assets/data/patient-info.json', 'patientInfo', 'loadedDetect');
    this.obtenerPaciente(this.obtenerId());
    this.getData('assets/data/patient-timeline.json', 'patientTimeline');
    this.getData('assets/data/patient-billings.json', 'billings');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  loadedDetect() {
    this.setLoaded();

    // this.currentAvatar = this.patientInfo.img;
    this.initPatientForm(this.patientInfo);
  }

  // init form
  initPatientForm(data: Paciente) {
    this.patientForm = this.formBuilder.group({
      img: [],
      nombre: [data.nombre, Validators.required],
      telefono: [data.telefono, Validators.required],
      domicilio: [data.domicilio, Validators.required],
      genero: [data.genero ? data.genero.toLowerCase() : '', Validators.required],
      edad: [data.edad, Validators.required],
      id: [data.id, Validators.required],
      // lastVisit: [data.lastVisit, Validators.required],
      // status: [data.status, Validators.required]
    });

    // detect form changes
    this.patientForm.valueChanges.subscribe(() => {
      this.changes = true;
    });
  }

  // save form data
  saveData(form: FormGroup) {
    if (form.valid) {
      this.patientInfo = form.value;
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

  obtenerPaciente(id: string){
    var paciente = this.pacienteService.getPaciente(id);

    paciente.snapshotChanges().subscribe(datos =>{
      this.patientInfo = datos.payload.data();
      this.loadedDetect();
    });
  }

  obtenerId(): string{
    return this.idService.devuelveDatos();
  }

}

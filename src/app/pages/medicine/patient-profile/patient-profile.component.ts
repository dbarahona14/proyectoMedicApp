import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { BasePageComponent } from '../../base-page';
import { IAppState } from '../../../interfaces/app-state';
import { HttpService } from '../../../services/http/http.service';
import { IOption } from '../../../ui/interfaces/option';
import { Content } from '../../../ui/interfaces/modal';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { Paciente } from 'src/app/interfaces/paciente';
import { IdService } from 'src/app/services/idService/id.service';
import { HistorialService } from 'src/app/services/historial/historial.service';
import { FichaClinica } from 'src/app/interfaces/ficha-clinica';
import { TCModalService } from 'src/app/ui/services/modal/modal.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PagePatientProfileComponent extends BasePageComponent implements OnInit, OnDestroy {
  patientInfo: Paciente;
  historialInfo: FichaClinica;
  patientTimeline: any;
  patientForm: FormGroup;
  historialForm: FormGroup;
  gender: IOption[];
  status: IOption[];
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;
  changes: boolean;
  billings: any[];

  patientName: string;

  idPaciente: string;

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private formBuilder: FormBuilder,
    private pacienteService: PacienteService,
    private idService: IdService,
    private historialService: HistorialService,
    private modal: TCModalService,
    private actRoute : ActivatedRoute,
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Perfil del paciente',
      breadcrumbs: [
        {
          title: 'Inicio',
          route: 'default-dashboard'
        },
        {
          title: 'Lista de pacientes',
          route: 'patients'
        },
        {
          title: 'Perfil del paciente'
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
    this.actRoute.params
      .subscribe( ({ id }) => {
        this.idPaciente = id;
        //console.log (id);
      });

    this.obtenerPaciente(this.idPaciente);
    // this.historialService.getAll(this.obtenerId()).snapshotChanges().subscribe(res =>{
    //   this.patientTimeline = res;
    // });
    this.getData('assets/data/patient-timeline.json', 'patientTimeline');
    //this.getData('assets/data/patient-billings.json', 'billings');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  loadedDetect() {
    this.setLoaded();

    // this.currentAvatar = this.patientInfo.img;
    this.initPatientForm(this.patientInfo);
  }

  // open modal window
  openModal<T>(body: Content<T>, header: Content<T> = null, footer: Content<T> = null, options: any = null) {
    this.initHistorialForm(this.historialInfo, this.patientInfo);

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
    // this.patientForm.reset();
    // this.searchForm.reset();
    //this.currentAvatar = this.defaultAvatar;
  }

  // init form
  initPatientForm(data: Paciente) {
    this.patientName = data.nombre;
    this.patientForm = this.formBuilder.group({
      img: [],
      nombre: [data.nombre, Validators.required],
      telefono: [data.telefono, Validators.required],
      correo: [data.correo, Validators.required],
      fNac: [data.fNac.toDate(), Validators.required],
      domicilio: [data.domicilio, Validators.required],
      genero: [data.genero ? data.genero.toLowerCase() : '', Validators.required],
      edad: [data.edad, Validators.required],
      id: [data.id, Validators.required],
      rut: [data.rut, Validators.required]
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

  initHistorialForm(data: FichaClinica, patient: Paciente) {
    this.historialForm = this.formBuilder.group({
      nombre: [patient.nombre, Validators.required],
      nombreFuncionario: ['Patricio Fuentes Díaz', Validators.required],
      fecha: [new Date(), Validators.required],
      alergias: ['Sin alergias.', Validators.required],
      antMorbidos: ['Sin antecedentes morbidos.', Validators.required],
      PA: ['128/79', Validators.required],
      FC: ['84', Validators.required],
      FR: ['0000', Validators.required],
      temperatura: ['36.9', Validators.required],
      sat: ['0000', Validators.required],
      title: ['Atención domicilio', Validators.required],
      content: ['Se procede a atender al paciente.', Validators.required],
      indicaciones: ['Sin indicaciones.', Validators.required],
      observaciones: ['Sin observaciones.', Validators.required],
    });
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
      if (this.patientInfo.genero === 'hombre'){
        this.currentAvatar = 'assets/content/male-icon.png';
      }
      else {
        this.currentAvatar = 'assets/content/female-icon.png';
      }
      this.loadedDetect();
    });
  }

  // obtenerId(): string{
  //   return this.idService.devuelveDatos();
  // }

  updatePatient(form: FormGroup) {
    if (form.valid) {
      let newPatient: Paciente = form.value;

      this.pacienteService.update(newPatient.id, newPatient).then( () =>{
        console.log('Paciente actualizado con éxito!!!')
      });
    }
  }

  agregaHistorial(form: FormGroup){
    if (form.valid){
      let newHistorial: FichaClinica = form.value;

      this.historialService.create(this.idPaciente, newHistorial).then ( () =>{
        console.log('Historial agregado correctamente!!!');
      });
    }
    this.closeModal();
    this.historialForm.reset();
  }

}

import { Component, ElementRef, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
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
import { map } from 'rxjs/operators';
import { ITimelineBox } from '../../../ui/interfaces/timeline';
import { ITimeline } from '../../../interfaces/ficha-clinica';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';

@Component({
  selector: 'page-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PagePatientProfileComponent extends BasePageComponent implements OnInit, OnDestroy {
  patientInfo: Paciente;
  historialInfo: ITimelineBox;
  patientTimeline: ITimelineBox;
  patientForm: FormGroup;
  historialForm: FormGroup;
  gender: IOption[];
  status: IOption[];
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;
  changes: boolean;
  billings: any[];

  timeline: ITimelineBox[];

  fichasClinicas: ITimelineBox[];
  noData: boolean = true;


  patientName: string;

  idPaciente: string;

  file_store: Array<FileList> = [];
  file_list: Array<string> = [];
  fd: FormData;

  newFileList: Array<File> = [];
  labelDocuments: string = 'Sin archivos adjuntos.';

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private formBuilder: FormBuilder,
    private pacienteService: PacienteService,
    private historialService: HistorialService,
    private modal: TCModalService,
    private actRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private storage: Storage
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
    this.actRoute.params
      .subscribe(({ id }) => {
        this.idPaciente = id;
        this.obtenerPaciente(this.idPaciente);
        this.obtenerHistorial(this.idPaciente);
      });

    //this.getData('assets/data/patient-info.json', 'patientInfo', 'loadedDetect');

    console.log(this.fichasClinicas);



    // this.historialService.getAll(this.obtenerId()).snapshotChanges().subscribe(res =>{
    //   this.patientTimeline = res;
    // });
    // this.getDataHistorial('assets/data/timelinehistorial.json', 'patientTimeline', this.fichasClinicas);
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
    this.labelDocuments = 'Sin archivos adjuntos.';
    this.file_list = [];
    this.newFileList = [];
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

  initHistorialForm(data: ITimelineBox, patient: Paciente) {
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
  onFileChanged($inputValue: any) {
    if (this.newFileList.length == 0) {
      this.newFileList = Array.from($inputValue.target.files); // Arreglar
    }
    else {
      var aux : Array <File> = Array.from($inputValue.target.files);
      this.newFileList = this.newFileList.concat(aux);
    }
    this.file_store = $inputValue.target.files;


    for (let i = 0; i < $inputValue.target.files.length; i++) {
      var selectedFile = $inputValue.target.files[i];
      this.file_list.push(selectedFile.name)
    }

    this.updateLabel();
    // const imgRef = ref(this.storage, `images/${file.name}`);

    // uploadBytes(imgRef, file)
    //   .then(response => console.log(response))
    //   .catch(error => console.log(error));

    // let reader: FileReader = new FileReader();

    // reader.onloadend = () => {
    //   this.currentAvatar = reader.result;
    //   this.changes = true;
    // };

    // reader.readAsDataURL(file);
  }

  updateLabel() {
    if (this.file_list.length > 0) {
      const count = this.file_list.length > 1 ? ` (+${this.file_list.length - 1} archivo(s))` : "";
      this.labelDocuments = `${this.file_list[0]}${count}`;
    } else {
      this.labelDocuments = "Sin archivos adjuntos.";
    }
  }

  deleteDoc(index: number) {
    this.newFileList.splice(index, 1);
    this.file_list.splice(index, 1);
    this.updateLabel();
  }




  obtenerPaciente(id: string) {
    var paciente = this.pacienteService.getPaciente(id);
    paciente.snapshotChanges().subscribe(datos => {
      this.patientInfo = datos.payload.data();
      if (this.patientInfo.genero === 'hombre') {
        this.currentAvatar = 'assets/content/male-icon.png';
      }
      else {
        this.currentAvatar = 'assets/content/female-icon.png';
      }
      this.loadedDetect();

    });

  }

  obtenerHistorial(idPaciente: string) {
    this.historialService.getAll(idPaciente).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      if (data && data.length) {
        this.noData = false;
        console.log(this.noData);
        this.fichasClinicas = data;
        console.log(this.fichasClinicas);
        this.getDataHistorial('patientTimeline', this.fichasClinicas);
        this.setLoaded();
      }
      else {
        this.noData = true;
      }
    });

  }

  // obtenerId(): string{
  //   return this.idService.devuelveDatos();
  // }

  updatePatient(form: FormGroup) {
    if (form.valid) {
      let newPatient: Paciente = form.value;

      this.pacienteService.update(newPatient.id, newPatient).then(() => {
        this.notificationService.showSuccess('Listo', 'Actualización de paciente realizada correctamente')
        // console.log('Paciente actualizado con éxito!!!')
      });
    }
  }

  agregaHistorial(form: FormGroup) {
    if (form.valid) {

      let newTimeLine: ITimeline = { title: "", content: "", date: "", iconBg: "", iconColor: "" };
      let newHistorial: ITimelineBox = {
        sectionLabel: { text: "", view: "" }, sectionData: [], sectionFicha: {
          FC: "string",
          FR: "string",
          PA: "string",
          alergias: "string",
          antMorbidos: "string",
          fecha: "any",
          indicaciones: "string",
          observaciones: "string",
          procedimiento: "string",
          sat: "string",
          temperatura: "string",
          content: "string",
          title: "string",
          date: "any",
          nombreFuncionario: "string"
        }, fecha: ""
      };

      console.log(form.get('title').value);

      newTimeLine.title = form.get('title').value;
      newTimeLine.content = form.get('content').value;
      newTimeLine.date = form.get('fecha').value;
      newTimeLine.iconBg = "#64B5F6";
      newTimeLine.iconColor = "";

      newHistorial.sectionLabel.text = "Today"
      newHistorial.sectionLabel.view = "accent"

      newHistorial.sectionData.push(newTimeLine);
      newHistorial.fecha = form.get('fecha').value;
      newHistorial.sectionFicha = form.value;

      this.historialService.create(this.idPaciente, newHistorial).then(() => {
        this.notificationService.showSuccess('Listo', 'Atención registrada correctamente');
        // console.log('Historial agregado correctamente!!!');
      });
    }
    this.closeModal();
    this.historialForm.reset();
  }

  mostrar() {
    console.log("SI ENTRA");
    this.notificationService.showSuccess("Título", "Mensaje");
  }

}

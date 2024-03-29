import { Component, ElementRef, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
import { Storage, ref, uploadBytes, listAll } from '@angular/fire/storage';
import { async } from '@firebase/util';
import { Usuario } from '../../../interfaces/usuario';

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
  sucursales: IOption[];
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;
  changes: boolean;
  billings: any[];

  timeline: ITimelineBox[];

  fichasClinicas: ITimelineBox[];
  noData: boolean = true;
  usuarioActivo: Usuario;

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
    this.sucursales = [
      {
        label: 'Sucursal 1',
        value: 'sucursal 1'
      },
      {
        label: 'Sucursal 2',
        value: 'sucursal 2'
      },
      {
        label: 'Sucursal 3',
        value: 'sucursal 3'
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
    this.usuarioActivo = JSON.parse(localStorage.getItem('userData'));
    //this.getData('assets/data/patient-info.json', 'patientInfo', 'loadedDetect');
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
    // this.newFileList = [];
    this.modal.close();
    // this.patientForm.reset();
    // this.searchForm.reset();
    //this.currentAvatar = this.defaultAvatar;
  }

  // init form
  initPatientForm(data: Paciente) {
    this.patientName = data.nombre;
    var edad = this.calcularEdad(data.fNac.toDate());
    this.patientForm = this.formBuilder.group({
      img: [],
      nombre: [data.nombre, Validators.required],
      telefono: [data.telefono, Validators.required],
      correo: [data.correo, Validators.required],
      alergias: [data.alergias ? data.alergias : 'Sin alergias'],
      antMorbidos: [data.antMorbidos ? data.antMorbidos : 'Sin antecedentes'],
      fNac: [data.fNac.toDate(), Validators.required],
      domicilio: [data.domicilio, Validators.required],
      genero: [data.genero ? data.genero.toLowerCase() : '', Validators.required],
      edad: [edad, Validators.required],
      id: [data.id, Validators.required],
      rut: [data.rut, [Validators.required, Validators.maxLength(12), Validators.pattern(/^[0-9]+-[0-9kK]{1}|(((\d{2})|(\d{1})).\d{3}\.\d{3}-)([0-9kK]){1}$/), this.checkVerificatorDigit]]
      // lastVisit: [data.lastVisit, Validators.required],
      // status: [data.status, Validators.required]
    });

    // detect form changes
    this.patientForm.valueChanges.subscribe(() => {
      this.changes = true;
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
      this.patientInfo = form.value;
      this.changes = false;
    }
  }

  initHistorialForm(data: ITimelineBox, patient: Paciente) {
    this.newFileList = [];
    this.historialForm = this.formBuilder.group({
      nombre: [patient.nombre, Validators.required],
      nombreFuncionario: [this.usuarioActivo.nombre + ' ' + this.usuarioActivo.apellidos, Validators.required],
      sucursal: ['', Validators.required],
      fecha: [new Date(), Validators.required],
      alergias: [patient.alergias ? patient.alergias : 'Sin alergias', Validators.required],
      antMorbidos: [patient.antMorbidos ? patient.antMorbidos : 'Sin antecedentes', Validators.required],
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
      var aux: Array<File> = Array.from($inputValue.target.files);
      this.newFileList = this.newFileList.concat(aux);
    }
    this.file_store = $inputValue.target.files;


    for (let i = 0; i < $inputValue.target.files.length; i++) {
      var selectedFile = $inputValue.target.files[i];
      this.file_list.push(selectedFile.name)
    }

    this.updateLabel();

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
        this.fichasClinicas = data;
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
          nombreFuncionario: "string",
          sucursal: "string"
        }, fecha: "",
        id: "",
        documents: false,
      };

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

      this.historialService.create(this.idPaciente, newHistorial).then(resp => {
        if (this.newFileList.length > 0) {
          newHistorial.documents = true;
          for (let index = 0; index < this.newFileList.length; index++) {
            const element = this.newFileList[index];
            const imgRef = ref(this.storage, `historial/${resp.id}/${element.name}`);
            uploadBytes(imgRef, element)
              .then(response => console.log(response))
              .catch(error => console.log(error));
          }
        }
        else{
          newHistorial.documents = false;
        }
        newHistorial.id = resp.id;
        this.historialService.update(this.idPaciente, resp.id, newHistorial).then(resp =>{
          this.notificationService.showSuccess('Listo', 'Atención registrada correctamente');
        })

        
        // console.log('Historial agregado correctamente!!!');
      });
    }
    this.closeModal();
    this.historialForm.reset();
  }

  mostrar() {
    this.notificationService.showSuccess("Título", "Mensaje");
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

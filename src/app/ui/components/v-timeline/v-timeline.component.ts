import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { ITimelineBox } from '../../interfaces/timeline';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TCModalService } from '../../services/modal/modal.service';
import { Paciente } from 'src/app/interfaces/paciente';
import { Content } from '../../interfaces/modal';
import { HistorialService } from 'src/app/services/historial/historial.service';
import { listAll, ref, Storage, getDownloadURL } from '@angular/fire/storage';
import { IOption } from '../../interfaces/option';

@Component({
  selector: 'tc-v-timeline',
  templateUrl: './v-timeline.component.html',
  styleUrls: ['./v-timeline.component.scss']
})
export class TCVTimelineComponent implements OnInit {
  @HostBinding('class') get class() {
    return 'tc-v-timeline';
  };
  @HostBinding('class.show-years') @Input() showLabels: boolean;
  @HostBinding('class.dots') get dots() {
    return !this.showIcons;
  };
  @HostBinding('class.align-left') get left() {
    return this.align === 'left';
  };
  @HostBinding('class.align-center') get center() {
    return this.align === 'center';
  };
  @HostBinding('class.align-right') get right() {
    return this.align === 'right';
  };
  @HostBinding('class.align-between') get between() {
    return this.align === 'between';
  };
  @Input() align: string;
  @Input() showIcons: boolean;
  @Input() data: ITimelineBox[];

  //Editado por mi
  historialForm: FormGroup;
  changes: boolean;
  documentos: any;
  isDocument: boolean;
  sucursales: IOption[];

  constructor(private modal: TCModalService,
    private formBuilder: FormBuilder,
    private storage: Storage) {
    this.align = 'left';
    this.showLabels = false;
    this.showIcons = true;
    this.data = [];
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

    this.changes = false;
  }

  //Editado por mi
  // open modal window
  openModal<T>(body: Content<T>, header: Content<T> = null, footer: Content<T> = null, options: any = null, data: ITimelineBox) {
    this.initHistorialForm(data);
    if (data.documents) {
      this.getDocuments(data.id);
      this.isDocument = true;
    }
    this.modal.open({
      header: header,
      footer: footer,
      options: options,
      body: body,
    });
  }

  closeModal() {
    this.documentos = [];
    this.isDocument = false;
    this.modal.close();
  }

  initHistorialForm(data: ITimelineBox) {
    this.historialForm = this.formBuilder.group({
      nombreFuncionario: [{ value: data.sectionFicha.nombreFuncionario, disabled: true }, Validators.required],
      sucursal: [{ value: data.sectionFicha.sucursal, disabled: true }, Validators.required],
      fecha: [data.fecha.toDate(), Validators.required],
      alergias: [{ value: data.sectionFicha.alergias, disabled: true }, Validators.required],
      antMorbidos: [{ value: data.sectionFicha.antMorbidos, disabled: true }, Validators.required],
      PA: [{ value: data.sectionFicha.PA, disabled: true }, Validators.required],
      FC: [{ value: data.sectionFicha.FC, disabled: true }, Validators.required],
      FR: [{ value: data.sectionFicha.FR, disabled: true }, Validators.required],
      temperatura: [{ value: data.sectionFicha.temperatura, disabled: true }, Validators.required],
      sat: [{ value: data.sectionFicha.sat, disabled: true }, Validators.required],
      title: [{ value: data.sectionFicha.title, disabled: true }, Validators.required],
      content: [{ value: data.sectionFicha.content, disabled: true }, Validators.required],
      indicaciones: [{ value: data.sectionFicha.indicaciones, disabled: true }, Validators.required],
      observaciones: [{ value: data.sectionFicha.observaciones, disabled: true }, Validators.required],
    });

    this.historialForm.valueChanges.subscribe(() => {
      this.changes = true;
    });
  }

  moreInfo() {
    console.log("CLICK!")
    return true;
  }

  getDocuments(id: string) {
    const documentsRef = ref(this.storage, `historial/${id}`);

    listAll(documentsRef).then(response => {
      this.documentos = response.items;
    }).catch(error => console.log(error));
  }

  downloadDocument (index: number) {
    getDownloadURL(this.documentos[index]).then(resp =>{
      window.open(resp, "_blank");
  });
    
  }

  // updateHistorial(form: FormGroup) {
  //   if (form.valid) {
  //     let newPatient: ITimelineBox = form.value;

  //     this.historialService.update().then( () =>{
  //       console.log('Historial actualizado con éxito!!!')
  //     });
  //   }
  // }

  ngOnInit() { }


}

import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { ITimelineBox } from '../../interfaces/timeline';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TCModalService } from '../../services/modal/modal.service';
import { Paciente } from 'src/app/interfaces/paciente';
import { Content } from '../../interfaces/modal';
import { HistorialService } from 'src/app/services/historial/historial.service';

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
  @HostBinding('class.dots')  get dots() {
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

  constructor(private modal: TCModalService,
    private formBuilder: FormBuilder,
    private historialService: HistorialService) {
    this.align = 'left';
    this.showLabels = false;
    this.showIcons = true;
    this.data = [];

    this.changes = false;
  }

  //Editado por mi
  // open modal window
  openModal<T>(body: Content<T>, header: Content<T> = null, footer: Content<T> = null, options: any = null, data : ITimelineBox) {
    this.initHistorialForm(data);

    this.modal.open({
      header: header,
      footer: footer,
      options: options,
      body: body,
    });
  }

  closeModal() {
    this.modal.close();
  }

  initHistorialForm(data: ITimelineBox) {
    this.historialForm = this.formBuilder.group({
      nombreFuncionario: [data.sectionFicha.nombreFuncionario, Validators.required],
      fecha: [data.fecha.toDate() , Validators.required],
      alergias: [data.sectionFicha.alergias, Validators.required],
      antMorbidos: [data.sectionFicha.antMorbidos, Validators.required],
      PA: [data.sectionFicha.PA, Validators.required],
      FC: [data.sectionFicha.FC, Validators.required],
      FR: [data.sectionFicha.FR, Validators.required],
      temperatura: [data.sectionFicha.temperatura, Validators.required],
      sat: [data.sectionFicha.sat, Validators.required],
      title: [data.sectionFicha.title, Validators.required],
      content: [data.sectionFicha.content, Validators.required],
      indicaciones: [data.sectionFicha.indicaciones, Validators.required],
      observaciones: [data.sectionFicha.observaciones, Validators.required],
    });
    this.historialForm.valueChanges.subscribe(() => {
      this.changes = true;
    });
  }

  moreInfo(){
    console.log("CLICK!")
    return true;
  }

  // updatePatient(form: FormGroup) {
  //   if (form.valid) {
  //     let newPatient: Paciente = form.value;

  //     this.historialService.update().then( () =>{
  //       console.log('Paciente actualizado con éxito!!!')
  //     });
  //   }
  // }

  ngOnInit() { }

  
}

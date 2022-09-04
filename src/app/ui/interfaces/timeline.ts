export interface FichaClinica {
  FC: string;
  FR: string;
  PA: string;
  alergias: string;
  antMorbidos: string;
  fecha: any;
  indicaciones: string;
  observaciones: string;
  //ordenMedica: string;
  procedimiento: string;
  sat: string;
  temperatura: string;
  content: string;
  title: string;
  date: any;
  nombreFuncionario: string; 
}

export interface ITimelineBox {
  sectionLabel: ITimelineLabel;
  sectionData: ITimeline[];
  sectionFicha: FichaClinica;
  fecha: any;
  id: string;
  documents?: boolean;
}

export interface ITimelineLabel {
  text: string;
  view?: string;
}
export interface ITimeline {
  date: string;
  content: string;
  title: string;
  icon?: string;
  iconBg?: string;
  iconColor?: string;
}

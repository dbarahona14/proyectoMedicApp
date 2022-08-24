import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { IPageData } from '../../interfaces/page-data';
import { IAppState } from '../../interfaces/app-state';
import { HttpService } from '../../services/http/http.service';
import * as PageActions from '../../store/actions/page.actions';
import { HistorialService } from 'src/app/services/historial/historial.service';
import { FichaClinica, ITimeline, ITimelineBox } from '../../interfaces/ficha-clinica';

@Component({
  selector: 'base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.scss']
})
export class BasePageComponent implements OnInit, OnDestroy {
  pageData: IPageData;

  constructor(
    public store: Store<IAppState>,
    public httpSv: HttpService,
  ) { }

  ngOnInit() {
    this.pageData ? this.store.dispatch(new PageActions.Set(this.pageData)) : null;
  }

  ngOnDestroy() {
    this.store.dispatch(new PageActions.Reset());
  }

  // get data
  // parameters:
  // * url - data url
  // * dataName - set data to 'dataName'
  // * callbackFnName run callback function with name 'callbackFnName'
  getData(url: string, dataName: string, callbackFnName?: string) {
    this.httpSv.getData(url).subscribe(
      data => {
        this[dataName] = data;
      },
      err => {
        console.log(err);
      },
      () => {
        (callbackFnName && typeof this[callbackFnName] === 'function') ? this[callbackFnName](this[dataName]) : null;
      }
    );
  }

  getDataHistorial(dataName: string, timeline: ITimelineBox[], callbackFnName?: string) {
    console.log(timeline);
    this[dataName] = timeline;
    // this.httpSv.getData(url).subscribe(
    //   data => {
    //     this[dataName] = data;
    //     //this.cargarFichas(dataName, fichasClinicas);
    //   },
    //   err => {
    //     console.log(err);
    //   },
    //   () => {
    //     (callbackFnName && typeof this[callbackFnName] === 'function') ? this[callbackFnName](this[dataName]) : null;
    //   }
    // );
  }

  setLoaded(during: number = 0) {
    setTimeout(() => this.store.dispatch(new PageActions.Update({ loaded: true })), during);
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { BasePageComponent } from '../../../base-page';
import { IAppState } from '../../../../interfaces/app-state';
import { HttpService } from '../../../../services/http/http.service';
import { environment } from '../../../../../environments/environment';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'page-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class PageGoogleMapsComponent extends BasePageComponent implements OnInit, OnDestroy {
  apiLoaded: Observable<boolean>;
  key: string = environment.googleMapApiKey
  options: google.maps.MapOptions = {
    center: { lat: 51.678418, lng: 7.809007 },
    zoom: 4
  };
	
  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private httpClient: HttpClient
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Google map',
      loaded: true,
      breadcrumbs: [
        {
          title: 'UI Kit',
          route: 'default-dashboard'
        },
        {
          title: 'Maps',
          route: 'default-dashboard'
        },
        {
          title: 'Google map'
        }
      ],
      fullFilled: true
    };
	}

  ngOnInit() {
    super.ngOnInit();

    this.apiLoaded = this.httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${this.key}`, 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}

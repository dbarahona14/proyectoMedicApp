import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { GoogleMapsModule } from '@angular/google-maps';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NgChartsModule } from 'ng2-charts';

import { UIModule } from '../ui/ui.module';
import { LayoutModule } from '../layout/layout.module';
import { BasePageComponent } from './base-page';

import { pages } from '../helpers/constants/pages';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { UsersComponent } from './medicine/users/users.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NgChartsModule,
    NgxChartsModule,
    NgxEchartsModule.forRoot({
      echarts: { init: echarts.init }
    }),
    LeafletModule,
    GoogleMapsModule,
    FullCalendarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    NzDatePickerModule,
    NzDividerModule,
    NzTableModule,
    NzPopconfirmModule,
    NzCarouselModule,
    DragDropModule,
    UIModule,
    LayoutModule
  ],
  declarations: [
    ...pages,
    BasePageComponent,
    UsersComponent
  ],
  exports: []
})
export class PagesModule {}

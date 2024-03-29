import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerticalLayoutComponent } from '../layout/vertical';
import { HorizontalLayoutComponent } from '../layout/horizontal';
 import { PublicLayoutComponent } from '../layout/public';

import { PageDashboardComponent } from '../pages/dashboards/dashboard-1';
import { PageButtonsComponent } from '../pages/ui/components/buttons';
import { PageCardsComponent } from '../pages/ui/components/cards';
import { PageInputsComponent } from '../pages/ui/components/inputs';
import { PageSelectsComponent } from '../pages/ui/components/selects';
import { PageTextareasComponent } from '../pages/ui/components/textareas';
import { PageAutocompletesComponent } from '../pages/ui/components/autocompletes';
import { PageBadgesComponent } from '../pages/ui/components/badges';
import { PageRatingsComponent } from '../pages/ui/components/ratings';
import { PageSimpleTablesComponent } from '../pages/ui/tables/simple-tables';
import { PageSortingTableComponent } from '../pages/ui/tables/sorting-table';
import { PageSearchTableComponent } from '../pages/ui/tables/search-table';
import { PageFilterTableComponent } from '../pages/ui/tables/filter-table';
import { PagePaginationTableComponent } from '../pages/ui/tables/pagination-table';
import { PageAlertsComponent } from '../pages/ui/components/alerts';
import { PageCheckboxesComponent } from '../pages/ui/components/checkboxes';
import { PageRadioButtonsComponent } from '../pages/ui/components/radio-buttons';
import { PageSwitchersComponent } from '../pages/ui/components/switchers';
import { PageFormElementsComponent } from '../pages/ui/forms/form-elements';
import { PageFormLayoutsComponent } from '../pages/ui/forms/form-layouts';
import { PageFormValidationComponent } from '../pages/ui/forms/form-validation';
import { PageNg2ChartsComponent } from '../pages/ui/charts/ng2-charts';
import { PageNgxChartsComponent } from '../pages/ui/charts/ngx-charts';
import { PageNgxEchartsComponent } from '../pages/ui/charts/ngx-echarts';
import { PageGoogleMapsComponent } from '../pages/ui/maps/google-maps';
import { PageWorldMapComponent } from '../pages/ui/maps/world-map';
import { PageTypographyComponent } from '../pages/ui/typography';
import { PageIconsOptionsComponent } from '../pages/ui/icons/icons-options';
import { PageIconsIfComponent } from '../pages/ui/icons/icons-if';
import { PageIconsSliComponent } from '../pages/ui/icons/icons-sli';
import { PageContactsComponent } from '../pages/ui/components/contacts';
import { PageDoctorsComponent } from '../pages/medicine/doctors';
import { PagePatientsComponent } from '../pages/medicine/patients';
import { PageModalWindowsComponent } from '../pages/ui/components/modal-windows';
import { PageDoctorProfileComponent } from '../pages/medicine/doctor-profile';
import { PagePaymentsComponent } from '../pages/medicine/payments';
import { PageAppointmentsComponent } from '../pages/medicine/appointments';
import { PageDepartmentsComponent } from '../pages/medicine/departments';
import { PageDepartmentComponent } from '../pages/medicine/department';
import { PageLeafletMapsComponent } from '../pages/ui/maps/leaflet-maps';
import { PageVTimelineComponent } from '../pages/ui/components/v-timeline';
import { PagePatientProfileComponent } from '../pages/medicine/patient-profile';
import { PageInvoiceComponent } from '../pages/apps/service-pages/invoice';
import { PagePricingComponent } from '../pages/apps/service-pages/pricing';
import { PageTimelineComponent } from '../pages/apps/service-pages/timeline';
import { PageUserProfileComponent } from '../pages/apps/service-pages/user-profile';
import { PageEditAccountComponent } from '../pages/apps/service-pages/edit-account';
import { PageCalendarComponent } from '../pages/apps/service-pages/calendar';
import { PageSignInComponent } from '../pages/apps/sessions/sign-in';
import { PageSignUpComponent } from '../pages/apps/sessions/sign-up';
import { PageSettingsComponent } from '../pages/settings';
import { PageSearchPaginationTableComponent } from '../pages/ui/tables/search-pagination-table';
import { Page404Component } from '../pages/apps/sessions/page-404';
import { Page500Component } from '../pages/apps/sessions/page-500';
import { PageDatepickersComponent } from '../pages/ui/components/datepickers';
import { PageAntTableComponent } from '../pages/ui/tables/ant-table';
import { UsersComponent } from '../pages/medicine/users/users.component';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

const privateRoutes: Routes = [
  { path: 'default-dashboard', component: PageDashboardComponent, canActivate: [ AuthGuard ], canLoad: [ AuthGuard ] },
  { path: 'doctors', component: PageDoctorsComponent, canActivate: [ AuthGuard ], canLoad: [ AuthGuard ] },
  { path: 'doctor-profile', component: PageDoctorProfileComponent, canActivate: [ AuthGuard ], canLoad: [ AuthGuard ] },
  { path: 'patients', component: PagePatientsComponent, canActivate: [ AuthGuard ], canLoad: [ AuthGuard ] },
  { path: 'patient-profile/:id', component: PagePatientProfileComponent, canActivate: [ AuthGuard ], canLoad: [ AuthGuard ] },
  { path: 'payments', component: PagePaymentsComponent, canActivate: [ AuthGuard ], canLoad: [ AuthGuard ] },
  { path: 'appointments', component: PageAppointmentsComponent, canActivate: [ AuthGuard ], canLoad: [ AuthGuard ] },
  { path: 'departments', component: PageDepartmentsComponent, canActivate: [ AuthGuard ], canLoad: [ AuthGuard ] },
  { path: 'department', component: PageDepartmentComponent, canActivate: [ AuthGuard ], canLoad: [ AuthGuard ] },
  { path: 'users', component: UsersComponent, canActivate: [ AuthGuard, AdminGuard ], canLoad: [ AuthGuard, AdminGuard ] },

  { path: 'alerts', component: PageAlertsComponent },
  { path: 'buttons', component: PageButtonsComponent },
  { path: 'cards', component: PageCardsComponent },
  { path: 'inputs', component: PageInputsComponent },
  { path: 'selects', component: PageSelectsComponent },
  { path: 'textareas', component: PageTextareasComponent },
  { path: 'autocompletes', component: PageAutocompletesComponent },
  { path: 'badges', component: PageBadgesComponent },
  { path: 'ratings', component: PageRatingsComponent },
  { path: 'checkboxes', component: PageCheckboxesComponent },
  { path: 'contacts', component: PageContactsComponent },
  { path: 'datepickers', component: PageDatepickersComponent },
  { path: 'radio-buttons', component: PageRadioButtonsComponent },
  { path: 'switchers', component: PageSwitchersComponent },
  { path: 'modal-windows', component: PageModalWindowsComponent },
  { path: 'v-timeline', component: PageVTimelineComponent },
  { path: 'simple-table', component: PageSimpleTablesComponent },
  { path: 'ant-table', component: PageAntTableComponent },
  { path: 'sorting-table', component: PageSortingTableComponent },
  { path: 'search-table', component: PageSearchTableComponent },
  { path: 'search-pagination-table', component: PageSearchPaginationTableComponent },
  { path: 'filtering-table', component: PageFilterTableComponent },
  { path: 'pagination-table', component: PagePaginationTableComponent },
  { path: 'form-elements', component: PageFormElementsComponent },
  { path: 'form-layout', component: PageFormLayoutsComponent },
  { path: 'form-validation', component: PageFormValidationComponent },
  { path: 'ng2-charts', component: PageNg2ChartsComponent },
  { path: 'ngx-charts', component: PageNgxChartsComponent },
  { path: 'ngx-echarts', component: PageNgxEchartsComponent },
  { path: 'google-map', component: PageGoogleMapsComponent },
  { path: 'leaflet-map', component: PageLeafletMapsComponent },
  { path: 'world-map', component: PageWorldMapComponent },
  { path: 'typography', component: PageTypographyComponent },
  { path: 'icons-options', component: PageIconsOptionsComponent },
  { path: 'icons-if', component: PageIconsIfComponent },
  { path: 'icons-sli', component: PageIconsSliComponent },

  { path: 'invoices', component: PageInvoiceComponent },
  { path: 'pricing', component: PagePricingComponent },
  { path: 'events-timeline', component: PageTimelineComponent },
  { path: 'user-profile', component: PageUserProfileComponent, canActivate: [ AuthGuard ], canLoad: [ AuthGuard ] },
  { path: 'edit-account/:id', component: PageEditAccountComponent, canActivate: [ AuthGuard ], canLoad: [ AuthGuard ] },
  { path: 'events-calendar', component: PageCalendarComponent },
  { path: 'settings', component: PageSettingsComponent, canActivate: [ AuthGuard ], canLoad: [ AuthGuard ] }
];

const publicRoutes: Routes = [
  { path: 'sign-in', component: PageSignInComponent },
  { path: 'page-404', component: Page404Component },
  { path: 'page-500', component: Page500Component },
  { path: '**', component: Page404Component }
];

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/public/sign-in',
    pathMatch: 'full'
  },
  {
    path: 'vertical',
    component: VerticalLayoutComponent,
    children: privateRoutes
  },
  {
    path: 'horizontal',
    component: HorizontalLayoutComponent,
    children: privateRoutes
  },
  {
    path: 'public',
    component: PublicLayoutComponent,
    children: publicRoutes
  },
  {
    path: '**',
    component: PublicLayoutComponent,
    children: publicRoutes
  }
];

@NgModule({
  imports: [],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }

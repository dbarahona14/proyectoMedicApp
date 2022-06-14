import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { BasePageComponent } from '../../base-page';
import { IAppState } from '../../../interfaces/app-state';
import { HttpService } from '../../../services/http/http.service';
import { IDepartmentDoctor } from '../../../interfaces/department';
import { IOption } from '../../../ui/interfaces/option';

@Component({
  selector: 'page-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class PageDepartmentComponent extends BasePageComponent implements OnInit, OnDestroy {
  doctors: IDepartmentDoctor[] = [];
  editCache: { [key: string]: { edit: boolean; data: IDepartmentDoctor } } = {};
  gender: IOption[] = [
    {
      label: 'Male',
      value: 'Male'
    },
    {
      label: 'Female',
      value: 'Female'
    }
  ];
  slides: any[] = [
    {
      img: '/assets/content/department-1.jpg',
      title: 'Chronic Disease and Self-Help Program Lay Leader Training'
    },
    {
      img: '/assets/content/department-2.jpg',
      title: 'BLS Instructor Course'
    },
    {
      img: '/assets/content/department-3.jpg',
      title: 'New Diagnostic Approaches and Therapeutic Interventions”'
    }
  ];

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Department page',
      breadcrumbs: [
        {
          title: 'Medicine',
          route: 'default-dashboard'
        },
        {
          title: 'Departments',
          route: 'departments'
        },
        {
          title: 'Neurology'
        }
      ]
    };
  }

  ngOnInit() {
    super.ngOnInit();

    this.getData('assets/data/department.json', 'doctors', 'setDoctors');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  setDoctors(): void {
    this.updateEditCache();
    this.setLoaded();
  }

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.doctors.findIndex(item => item.id === id);

    this.editCache[id] = {
      data: { ...this.doctors[index] },
      edit: false
    };
  }

  updateEditCache(): void {
    this.doctors.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  saveEdit(id: string): void {
    const index = this.doctors.findIndex(item => item.id === id);

    Object.assign(this.doctors[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }
}

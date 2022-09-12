import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasePageComponent } from '../../../base-page';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../interfaces/app-state';
import { HttpService } from '../../../../services/http/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOption } from '../../../../ui/interfaces/option';
import { Usuario } from 'src/app/interfaces/usuario';
import { CrudUsuarioService } from 'src/app/services/usuario/crud-usuario.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class PageEditAccountComponent extends BasePageComponent implements OnInit, OnDestroy {
  userInfo: any;
  userForm: FormGroup;
  gender: IOption[];
  status: IOption[];
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;
  changes: boolean;

  currentUser: Usuario;

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private formBuilder: FormBuilder,
    private userService: CrudUsuarioService,
    private actRoute: ActivatedRoute
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Editar cuenta',
      loaded: true,
      breadcrumbs: [
        {
          title: 'Inicio',
          route: 'default-dashboard'
        },
        // {
        //   title: 'Service pages',
        //   route: 'default-dashboard'
        // },
        {
          title: 'Editar cuenta'
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
    
  }

  ngOnInit() {
    super.ngOnInit();
    this.actRoute.params
      .subscribe(({ id }) => {
        this.obtenerUsuario(id);
      });

    // this.getData('assets/data/account-data.json', 'userInfo', 'loadedDetect');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  loadedDetect() {
    this.setLoaded();

    //this.currentAvatar = this.userInfo.img;
    this.inituserForm(this.currentUser);
  }

  // init form
  inituserForm(data: Usuario) {
    var edad = this.calcularEdad(data.fNac.toDate());
    this.userForm = this.formBuilder.group({
      //img: [this.currentAvatar],
      nombre: [data.nombre, Validators.required],
      apellido: [data.apellido, Validators.required],
      rut: [data.rut, Validators.required],
      telefono: [data.telefono, Validators.required],
      domicilio: [data.domicilio, Validators.required],
      genero: [data.genero ? data.genero.toLowerCase() : '', Validators.required],
      fNac: [data.fNac.toDate(), Validators.required],
      email: [data.email, Validators.required],
      edad: [edad, Validators.required],
      // lastVisit: [data.lastVisit, Validators.required],
      // status: [data.status, Validators.required]
    });

    // detect form changes
    this.userForm.valueChanges.subscribe(() => {
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
      this.userInfo = form.value;
      this.changes = false;
    }
  }

  // upload new file
  onFileChanged(inputValue: any) {
    let file: File = inputValue.target.files[0];
    let reader: FileReader = new FileReader();

    reader.onloadend = () => {
      this.currentAvatar = reader.result;
      this.changes = true;
    };

    reader.readAsDataURL(file);
  }

  obtenerUsuario(id: string) {
    var paciente = this.userService.getUserById(id);
    paciente.snapshotChanges().subscribe(datos => {
      this.currentUser = datos.payload.data();
      if (this.currentUser.genero === 'hombre') {
        this.currentAvatar = 'assets/content/male-icon.png';
      }
      else {
        this.currentAvatar = 'assets/content/female-icon.png';
      }
      this.loadedDetect();

    });
  }
}

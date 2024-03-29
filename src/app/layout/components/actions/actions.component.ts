import { Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth/auth.service';



import { HttpService } from '../../../services/http/http.service';



@Component({
  selector: 'actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  notifications: any[];
  messages: any[];
  files: any[];
  closeDropdown: EventEmitter<boolean>;
  @Input() layout: string;

  usuarioLogIn: Usuario;
  img: string;


  constructor(
    private auth: AuthService,
    private httpSv: HttpService,
    private router: Router,
  ) {
    this.notifications = [];
    this.messages = [];
    this.files = [];
    this.closeDropdown = new EventEmitter<boolean>();
    this.layout = 'vertical';
  }




  ngOnInit() {
    this.usuarioLogIn = JSON.parse(localStorage.getItem('userData'));
    this.img = 'assets/content/male-icon.png';
    this.getData('assets/data/navbar-notifications.json', 'notifications');
    this.getData('assets/data/navbar-messages.json', 'messages');
    this.getData('assets/data/navbar-files.json', 'files');
  }

  getData(url: string, dataName: string) {
    this.httpSv.getData(url).subscribe(
      data => {
        this[dataName] = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  onCloseDropdown() {
    this.closeDropdown.emit(true);
  }

  goTo(event: Event, link: string, layout: string = '') {
    event.preventDefault();
    this.onCloseDropdown();
    if (link == 'sign-in') {
      this.auth.logout();
      setTimeout(() => {
        this.router.navigate(['../public/sign-in/']);
      });
    }
    else {
      setTimeout(() => {
        this.router.navigate(['../vertical/edit-account/', this.usuarioLogIn.uid]);
      });
    }
  }
}

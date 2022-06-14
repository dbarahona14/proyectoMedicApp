import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { IUser } from '../../interfaces/user';

@Component({
  selector: 'tc-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class TCContactComponent implements OnInit {
  @HostBinding('class') get class() {
    return 'tc-contact';
  };

	@Input() data: IUser;

  constructor() {}

  ngOnInit() {}
}

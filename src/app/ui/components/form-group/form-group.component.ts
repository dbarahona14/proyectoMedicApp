import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'tc-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})
export class TCFormGroupComponent implements OnInit {
  @HostBinding('class') get class() {
    return 'tc-form-group';
  };

  constructor() { }

  ngOnInit() { }
}

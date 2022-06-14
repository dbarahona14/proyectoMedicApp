import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'tc-form-description',
  templateUrl: './form-description.component.html',
  styleUrls: ['./form-description.component.scss']
})
export class TCFormDescriptionComponent implements OnInit {
  @HostBinding('class') get class() {
    return 'tc-form-description';
  };

  constructor() { }

  ngOnInit() { }
}

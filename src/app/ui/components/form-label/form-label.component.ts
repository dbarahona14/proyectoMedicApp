import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'tc-form-label',
  templateUrl: './form-label.component.html',
  styleUrls: ['./form-label.component.scss']
})
export class TCFormLabelComponent implements OnInit {
  @HostBinding('class') get class() {
    return 'tc-form-label';
  };

  constructor() { }

  ngOnInit() { }
}

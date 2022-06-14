import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[tcShape]'
})
export class TCShapeDirective {
  @HostBinding('class') get class() {
    return 'custom-shape';
  };
  @Input() tcShape: number | string;
  @HostBinding('style.borderRadius') get getShape() {
    const SHAPE = this.tcShape;

    return (typeof SHAPE === 'number') ? SHAPE + 'px': SHAPE;
  };
}

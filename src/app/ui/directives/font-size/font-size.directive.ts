import {Directive, HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[tcFontSize]'
})
export class TCFontSizeDirective {
  @HostBinding('class') get class() {
    return 'custom-font-size';
  };
  @Input() tcFontSize: number | string;
  @HostBinding('style.fontSize') get getFontSize() {
    const SIZE = this.tcFontSize;

    return (typeof SIZE === 'number') ? SIZE + 'px' : SIZE;
  };
}

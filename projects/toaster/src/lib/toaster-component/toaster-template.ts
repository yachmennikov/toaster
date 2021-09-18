import { Component, Input } from '@angular/core';
import { ToasterComponentI, ToasterStylesI } from '../models';

@Component({
  selector: 'sy-toaster-template',
  templateUrl: 'toaster-template.html',
  styleUrls: ['toaster-template.less']
})
export class ToasterTemplate implements ToasterComponentI {

  @Input() message: string;
  @Input() positionClass: string;
  @Input() type: string;
  @Input() styles: ToasterStylesI;

  private colorMap = {
    notification: '#007bff',
    success: '#28a745',
    warning: '#ffc107',
    error: '#dc3545'
  };

  public getPositionClass(): { [key: string]: boolean } {
    return { [!this.positionClass ? 'top-right' : this.positionClass]: true };
  }

  public getStylesList(): { [key: string]: string } {

    const { height, width, color, backgroundColor, boxShadow, borderRadius, top, bottom, left, right, padding } = this.styles;

    return {
      height: !height ? '50px' : height,
      width: !width ? '300px' : width,
      padding: !padding ? ' 0 15px' : padding,
      color: !color ? '#fff' : color,
      backgroundColor: !backgroundColor ? this.colorMap[this.type] : backgroundColor,
      ...(boxShadow && { boxShadow }),
      ...(borderRadius && { borderRadius }),
      ...(top && { top }),
      ...(bottom && { bottom }),
      ...(left && { left }),
      ...(right && { right }),
    };
  }

}

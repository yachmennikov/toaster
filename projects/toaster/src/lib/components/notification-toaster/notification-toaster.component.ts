import { Component, Input } from '@angular/core';
import { ToasterComponentI, ToasterStylesI } from '../../models';

@Component({
  selector: 'sy-notification-toaster',
  templateUrl: 'notification-toaster.component.html',
  styleUrls: ['notification-toaster.component.less']
})
export class NotificationToasterComponent implements ToasterComponentI {

  @Input() message: string;
  @Input() styles: ToasterStylesI;

}

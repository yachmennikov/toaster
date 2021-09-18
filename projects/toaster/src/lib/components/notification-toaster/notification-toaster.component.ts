import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'sy-notification-toaster',
  templateUrl: 'notification-toaster.component.html',
  styleUrls: ['notification-toaster.component.less']
})
export class NotificationToasterComponent  {

  @Input() message: string = 'default-message';
  @Input() styles: any;

}

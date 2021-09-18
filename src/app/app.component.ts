import { Component } from '@angular/core';
import { ToasterService } from '../../projects/toaster/src/lib/toaster.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  constructor(private toasterService: ToasterService) {}

  public getNotificationMessage(): void {
    this.toasterService.notification('This is notification message example for you');
  }

  public getSuccessMessage(): void {
    this.toasterService.success('This is success message example for you');
  }

  public getWarningMessage(): void {
    this.toasterService.warning('This is warning message example for you');
  }

  public getErrorMessage(): void {
    this.toasterService.error('This is error message example for you');
  }
}

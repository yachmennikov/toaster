import {AfterViewInit, Component,} from '@angular/core';
import {ToasterService} from '../../projects/toaster/src/lib/toaster.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements AfterViewInit {
  title = 'toaster';

  constructor(private toasterService: ToasterService) {}

  ngAfterViewInit(): void {
    this.toasterService.notification('232');
  }
}

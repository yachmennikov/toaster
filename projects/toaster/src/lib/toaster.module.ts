import { ModuleWithProviders, NgModule } from '@angular/core';
import { ToasterService } from './toaster.service';
import { TOASTER_CONFIG } from './tokens';
import { ToasterInsertDirective } from './toaster-insert.directive';
import { ToasterComponent } from './toaster-component/toaster.component';
import { ToasterWrapperComponent } from './toaster-wrapper/toaster-wrapper..component';
import { ToasterConfigI } from './models';
import { CommonModule } from '@angular/common';
import { MountService } from './mount.service';

@NgModule({
  declarations: [ToasterComponent, ToasterWrapperComponent, ToasterInsertDirective],
  imports: [CommonModule],
  providers: [ToasterService, MountService],
})
export class ToasterModule {

  constructor(private behaviorService: MountService) {
    this.behaviorService.insertToaster();
  }

  static forRoot(config: ToasterConfigI = {}): ModuleWithProviders<ToasterModule> {
    return {
      ngModule: ToasterModule,
      providers: [
        {
          provide: TOASTER_CONFIG,
          useValue: config
        }
      ]
    };
  }
}

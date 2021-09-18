import { ModuleWithProviders, NgModule } from '@angular/core';
import { ToasterService } from './toaster.service';
import { TOASTER_COMPONENTS_MAP, TOASTER_CONFIG } from './tokens/tokens';
import { ToasterInsertDirective } from './directives/toaster-insert.directive';
import { NotificationToasterComponent } from './components/notification-toaster/notification-toaster.component';
import { toasterComponentsMap } from './components.map';
import { ToasterBaseComponent } from './components/toaster-base/toaster-base.component';
import { ToasterConfigI } from './models';

@NgModule({
  declarations: [NotificationToasterComponent, ToasterBaseComponent, ToasterInsertDirective],
  imports: [],
  providers: [ToasterService],
  exports: [ToasterBaseComponent]
})
export class ToasterModule {

  static forRoot(config: ToasterConfigI = {}): ModuleWithProviders<ToasterModule> {
    return {
      ngModule: ToasterModule,
      providers: [
        {
          provide: TOASTER_CONFIG,
          useValue: config
        },
        {
          provide: TOASTER_COMPONENTS_MAP,
          useValue: toasterComponentsMap
        }
      ]
    };
  }
}

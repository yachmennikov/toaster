import { ModuleWithProviders, NgModule } from '@angular/core';
import { ToasterService } from './toaster.service';
import { TOASTER_CONFIG } from './tokens';
import { ToasterInsertDirective } from './toaster-insert.directive';
import { ToasterTemplate } from './toaster-component/toaster-template';
import { ToasterComponent } from './toaster/toaster.component';
import { ToasterConfigI } from './models';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ToasterTemplate, ToasterComponent, ToasterInsertDirective],
  imports: [CommonModule],
  providers: [ToasterService],
  exports: [ToasterComponent]
})
export class ToasterModule {

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

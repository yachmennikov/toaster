import { ModuleWithProviders, NgModule } from '@angular/core';
import { ToasterComponent } from './toaster.component';

@NgModule({
  declarations: [ToasterComponent],
  imports: [],
  exports: [ToasterComponent]
})
export class ToasterModule {

  static forRoot(): ModuleWithProviders<ToasterModule> {
    return {
      ngModule: ToasterModule,
      providers: []
    };
  }
}

import { ApplicationRef, ComponentFactoryResolver, Inject, Injectable, Injector } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ToasterWrapperComponent } from '../toaster-wrapper/toaster-wrapper.component';

@Injectable()
export class MountService {

  constructor(
    private injector: Injector,
    private cfr: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  public insertToaster(): void {
    const toasterWrapper = this.cfr.resolveComponentFactory(ToasterWrapperComponent).create(this.injector);
    this.appRef.attachView(toasterWrapper.hostView);
    this.document.body.prepend(toasterWrapper.location.nativeElement);
  }
}

import { AfterViewInit, ComponentFactoryResolver, Directive, Inject, Injector, ViewContainerRef } from '@angular/core';
import { ToasterService } from '../toaster.service';
import { TOASTER_COMPONENTS_MAP, TOASTER_CONFIG } from '../tokens/tokens';
import { delay, take, tap } from 'rxjs/operators';
import { ToasterComponentMap, ToasterConfigI } from '../models';

@Directive({
  selector: '[syToasterInsertion]',
})
export class ToasterInsertDirective implements AfterViewInit {

  private defaultDuration: number = 50000;

  constructor(
    public viewRef: ViewContainerRef,
    private injector: Injector,
    private toasterService: ToasterService,
    private cfr: ComponentFactoryResolver,
    @Inject(TOASTER_CONFIG) private config: ToasterConfigI,
    @Inject(TOASTER_COMPONENTS_MAP) private componentsMap: ToasterComponentMap,
  ) {}

  ngAfterViewInit(): void {

   this.toasterService.currentToaster$
     .pipe(
       take(1),
       tap(({ type, message }) => {
         const componentFactory = this.cfr.resolveComponentFactory(this.componentsMap.get(type));
         const componentRef = componentFactory.create(this.injector);
         componentRef.instance.message = message;
         componentRef.instance.styles = !this.config[type] ? {} : this.config[type];
         componentRef.changeDetectorRef.detectChanges();
         this.viewRef.insert(componentRef.hostView);
       }),
       delay(this.defaultDuration),
       tap(() => this.viewRef.clear())
     )
     .subscribe();
  }
}

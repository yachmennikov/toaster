import { AfterViewInit, ComponentFactoryResolver, Directive, Inject, Injector, Type, ViewContainerRef } from '@angular/core';
import { ToasterService } from '../toaster.service';
import { TOASTER_COMPONENTS_MAP, TOASTER_CONFIG } from '../tokens/tokens';
import { delay, take, tap } from 'rxjs/operators';
import { ToasterComponentMap } from '../models';

@Directive({
  selector: '[syToasterInsertion]',
})
export class ToasterInsertDirective implements AfterViewInit {

  private timeout: number = 50000;

  constructor(
    public viewRef: ViewContainerRef,
    private injector: Injector,
    private toasterService: ToasterService,
    private cfr: ComponentFactoryResolver,
    @Inject(TOASTER_CONFIG) private config: any,
    @Inject(TOASTER_COMPONENTS_MAP) private componentsMap: ToasterComponentMap,
  ) {}

  ngAfterViewInit(): void {

   this.toasterService.currentToaster$
     .pipe(
       take(1),
       tap(({ type, message }) => {
         const componentFactory = this.cfr.resolveComponentFactory(this.componentsMap[type]);
         const componentRef = componentFactory.create(this.injector);
         componentRef.instance.message = message;
         componentRef.changeDetectorRef.detectChanges();
         this.viewRef.insert(componentRef.hostView);
       }),
       delay(this.timeout),
       tap(() => this.viewRef.clear())
     )
     .subscribe();
  }
}

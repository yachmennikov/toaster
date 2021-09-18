import { AfterViewInit, ComponentFactoryResolver, Directive, Inject, Injector, ViewContainerRef } from '@angular/core';
import { ToasterService } from '../toaster.service';
import { TOASTER_COMPONENTS_MAP, TOASTER_CONFIG } from '../tokens/tokens';
import { delay, take, tap } from 'rxjs/operators';

@Directive({
  selector: '[syToasterInsertion]',
})
export class ToasterInsertDirective implements AfterViewInit {

  private timeout: number = 5000;

  constructor(
    public viewRef: ViewContainerRef,
    private injector: Injector,
    private toasterService: ToasterService,
    private cfr: ComponentFactoryResolver,
    @Inject(TOASTER_CONFIG) private config: any,
    @Inject(TOASTER_COMPONENTS_MAP) private componentsMap: any,
  ) {}

  ngAfterViewInit(): void {

   this.toasterService.currentToaster$
     .pipe(
       take(1),
       tap(({ type, message }) => {
         const componentFactory = this.cfr.resolveComponentFactory(this.componentsMap[type]);
         const componentRef = componentFactory.create(this.injector);
         this.viewRef.insert(componentRef.hostView);
       }),
       delay(this.timeout),
       tap(() => this.viewRef.clear())
     )
     .subscribe();
  }
}

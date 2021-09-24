import { AfterViewInit, ComponentFactoryResolver, Directive, Inject, Injector, OnDestroy, ViewContainerRef } from '@angular/core';
import { ToasterService } from './toaster.service';
import { TOASTER_CONFIG } from './tokens';
import { tap, delay } from 'rxjs/operators';
import { ToasterConfigI } from './models';
import { Subject } from 'rxjs';
import { ToasterTemplate } from './toaster-component/toaster-template';

@Directive({
  selector: '[syToasterInsertion]',
})
export class ToasterInsertDirective implements AfterViewInit, OnDestroy {

  private duration: number;
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    public viewRef: ViewContainerRef,
    private injector: Injector,
    private toasterService: ToasterService,
    private cfr: ComponentFactoryResolver,
    @Inject(TOASTER_CONFIG) private config: ToasterConfigI,
  ) {
    this.duration = this.config.duration || 5000;
  }

  ngAfterViewInit(): void {

   this.toasterService.currentToaster$
     .pipe(
       tap(({ type, message }) => {

         const componentFactory = this.cfr.resolveComponentFactory(ToasterTemplate);
         const componentRef = componentFactory.create(this.injector);

         componentRef.instance.message = message;
         componentRef.instance.positionClass = this.config.positionClass;
         componentRef.instance.styles = !this.config[type] ? {} : this.config[type];
         componentRef.instance.type = type;
         componentRef.changeDetectorRef.detectChanges();
         this.viewRef.insert(componentRef.hostView);
       }),
       delay(this.duration),
       tap(() => this.viewRef.clear())
     )
     .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

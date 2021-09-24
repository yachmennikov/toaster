import {
  AfterViewInit,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Inject,
  Injector,
  OnDestroy,
  Renderer2,
} from '@angular/core';
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
    private injector: Injector,
    private toasterService: ToasterService,
    private cfr: ComponentFactoryResolver,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(TOASTER_CONFIG) private config: ToasterConfigI,
  ) {
    this.duration = this.config.duration || 5000;
  }

  ngAfterViewInit(): void {

   this.toasterService.currentToaster$
     .pipe(
       tap(({ type, message }) => {

         const componentRef = this.cfr.resolveComponentFactory(ToasterTemplate).create(this.injector);

         const parent = this.elementRef.nativeElement;
         parent.classList.add(this.config.positionClass || 'top-right');

         componentRef.instance.message = message;
         componentRef.instance.styles = !this.config[type] ? {} : this.config[type];
         componentRef.instance.type = type;
         componentRef.changeDetectorRef.detectChanges();
         this.renderer.appendChild(parent, componentRef.location.nativeElement);
       }),
       delay(this.duration),
       tap(() => this.renderer.removeChild(parent, this.elementRef.nativeElement.children[0]))
     )
     .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

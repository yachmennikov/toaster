import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ToasterEventI } from './models';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  public get currentToaster$(): Observable<ToasterEventI> {
    return this.currentToasterSub$.asObservable();
  }

  private currentToasterSub$: Subject<ToasterEventI> = new Subject<ToasterEventI>();


  public notification(message: string): void {
    this.currentToasterSub$.next({ type: 'notification', message });
  }

  public success(message: string): void {
    this.currentToasterSub$.next({ type: 'success', message });
  }

  public warning(message: string): void {
    this.currentToasterSub$.next({ type: 'warning', message });
  }

  public error(message: string) {
    this.currentToasterSub$.next({ type: 'error', message });
  }
}

import { InjectionToken } from '@angular/core';
import { ToasterComponentMap } from '../models';

export const TOASTER_CONFIG = new InjectionToken<any>('TOASTER_CONFIG');
export const TOASTER_COMPONENTS_MAP = new InjectionToken<ToasterComponentMap>('TOASTER_COMPONENTS_MAP');

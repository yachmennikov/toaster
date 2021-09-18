import { Type } from '@angular/core';

export interface ToasterEventI {
  type: string;
  message: string;
}

export type ToasterComponentMap = { [key: string]: Type<any> };

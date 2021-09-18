import { Type } from '@angular/core';

export interface ToasterEventI {
  type: string;
  message: string;
}

export interface ToasterStylesI {
    height?: string;
    width?: string;
    boxShadow?: string;
    borderRadius?: string;
}

export interface ToasterComponentI {
  message: string;
  styles: ToasterStylesI;
}

export interface ToasterConfigI {
  notification?: ToasterStylesI;
  success?: ToasterStylesI;
  warning?: ToasterStylesI;
  error?: ToasterStylesI;
  positionClass?: string;
  duration?: number;
  withBottomBorder?: boolean;
}

export type ToasterComponentMap = Map<string, Type<ToasterComponentI>>;



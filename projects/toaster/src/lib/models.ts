export interface ToasterEventI {
  type: string;
  message: string;
}

export interface ToasterStylesI {
    height?: string;
    width?: string;
    color?: string;
    backgroundColor?: string;
    boxShadow?: string;
    borderRadius?: string;
    margin?: string;
    padding?: string;
}

export interface ToasterComponentI {
  message: string;
  type: string;
  styles: ToasterStylesI;
}

export interface ToasterConfigI {
  notification?: ToasterStylesI;
  success?: ToasterStylesI;
  warning?: ToasterStylesI;
  error?: ToasterStylesI;
  positionClass?: string;
  duration?: number;
  isSingleMode?: boolean;
}



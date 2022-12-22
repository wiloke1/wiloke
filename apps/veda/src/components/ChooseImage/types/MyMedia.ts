export interface MyMedia {
  url: string;
  id: string | number;
  width: number;
  height: number;
  name: string;
}

export interface UploadFile {
  file: File;
}
export interface UploadStock {
  src: string;
}
export interface UploadBase64Screenshot {
  base64: string;
}

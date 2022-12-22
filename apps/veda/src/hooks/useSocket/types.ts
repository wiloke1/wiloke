export interface OnConnect {
  onSuccess: () => void;
  onError: () => void;
}

export interface OnDisconnect {
  cb?: () => void;
}

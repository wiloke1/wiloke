export class Base64 {
  public static encode(value: string, useEncodeURIComponent = false) {
    try {
      if (!value) {
        return value;
      }
      if (useEncodeURIComponent) {
        return btoa(encodeURIComponent(value));
      }
      return btoa(value);
    } catch {
      return value;
    }
  }

  public static decode(value: string, useEncodeURIComponent = false) {
    try {
      if (!value) {
        return value;
      }
      if (useEncodeURIComponent) {
        return decodeURIComponent(atob(value));
      }
      return atob(value);
    } catch {
      return value;
    }
  }
}

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise(res => {
    const reader = new FileReader();
    reader.onloadend = function() {
      res((reader.result as string).replace(`data:${file.type};base64,`, ''));
    };
    reader.readAsDataURL(file);
  });
};

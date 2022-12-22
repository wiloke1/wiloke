export async function imageUrlToFile({ url, name }: { url: string; name: string }) {
  const response = await fetch(url);
  const blob = await response.blob();
  const file = new File([blob], name, { type: blob.type });
  return file;
}

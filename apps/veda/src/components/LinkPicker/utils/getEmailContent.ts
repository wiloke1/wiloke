export function getEmail(value: string) {
  let result = '';
  const reg = value.match(/mailto:(.*)\?/);
  if (reg !== null) {
    result = reg[1];
  }
  return result;
}

export function getSubject(value: string) {
  let result = '';
  const reg = value.match(/subject=(.*?)\&body=/);
  if (reg !== null) {
    result = reg[1];
  }
  return result;
}

export function getContent(value: string) {
  const res = value.replace(/.*&body=/gm, '');
  return res;
}

exports.customValue = value => {
  if (/color-\w*/g.test(value)) {
    const val = Array.from(new Set(value.match(/color(-\w*)*(\.\d*|)/g)));
    return val.reduce((str, val) => {
      if (/\.\d*/g.test(val)) {
        const alpha = val.replace(/.*(?=\.\d*)/g, '');
        return str.replaceAll(val, `rgba(var(--rgb-${val.replace(/\.\d*$/g, '')}), ${alpha})`).replace(/\)\.\d*/g, ')');
      }
      return str.replaceAll(val, `var(--${val})`);
    }, value);
  }
  if (/font-\w*/g.test(value)) {
    const val = value.match(/font(-\w*)*/g)?.[0];
    return value.replace(/font(-\w*)*/g, `var(--${val})`);
  }
  return value;
};

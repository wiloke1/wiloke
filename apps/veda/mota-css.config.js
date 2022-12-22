const { rtl, pfs, groupHover } = require('mota-css');
const { numberOfLines } = require('./mota-plugins/numberOfLines/numberOfLines');
const { customValue } = require('./mota-plugins/customValue/customValue');

module.exports = {
  input: ['./src/**/*.tsx', './src/**/*.ts'],
  output: './src/styles/atomic.css',
  defaultCss: '',
  plugins: [rtl(), pfs(), groupHover(), numberOfLines()],
  customValue,
  breakpoints: {
    sm: '768px',
    md: '992px',
    lg: '1200px',
  },
};

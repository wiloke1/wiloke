const styleForDev = `
iframe[style^="position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; border: none; z-index: "] {
  top: calc(100% - 30px) !important;
  left: calc(30px - 100%) !important;
  box-shadow: 0 0 0 20px red !important;
}
iframe[style^="position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; border: none; z-index: "]:hover {
  top: 0 !important;
  left: 0 !important;
  box-shadow: none !important;
}`;

const scss = `
  ${process.env.NODE_ENV === 'development' ? styleForDev : ''}
`;

export default scss;

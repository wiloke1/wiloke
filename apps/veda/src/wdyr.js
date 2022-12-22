import React from 'react';

// if (window.location.pathname === '/iframe') {
const whyDidYouRender = require('@welldone-software/why-did-you-render');
whyDidYouRender(React, {
  trackHooks: true,
  trackExtraHooks: [[require('react-redux/lib'), 'useSelector']],
  notifier: console.log,
});
// }

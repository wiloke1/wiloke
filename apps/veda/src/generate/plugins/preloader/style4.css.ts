const style4 = `
/* Preloader style4 */
.veda-preloader__item--4,
.veda-preloader__item--4:before,
.veda-preloader__item--4:after {
  background: var(--veda-preloader-color, var(--color-light-freeze));
  -webkit-animation: load1 1s infinite ease-in-out;
  animation: load1 1s infinite ease-in-out;
  width: 1em;
  height: 4em;
}
.veda-preloader__item--4 {
  color: var(--veda-preloader-color, var(--color-light-freeze));
  position: relative;
  font-size: 6px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.veda-preloader__item--4:before,
.veda-preloader__item--4:after {
  position: absolute;
  top: 0;
  content: '';
}
.veda-preloader__item--4:before {
  left: -1.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.veda-preloader__item--4:after {
  left: 1.5em;
}
@-webkit-keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}
@keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}
`;
export default style4;

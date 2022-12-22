const style2 = `
/* Preloader style2 */
.veda-preloader__item--2,
.veda-preloader__item--2:before,
.veda-preloader__item--2:after {
  border-radius: 50%;
  width: 2em;
  height: 2em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}
.veda-preloader__item--2 {
  color: var(--veda-preloader-color, var(--color-light-freeze));
  font-size: 8px;
  position: relative;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.veda-preloader__item--2:before,
.veda-preloader__item--2:after {
  content: '';
  position: absolute;
  top: 0;
}
.veda-preloader__item--2:before {
  left: -3.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.veda-preloader__item--2:after {
  left: 3.5em;
}
@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
`;
export default style2;

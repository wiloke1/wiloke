const style3 = `
/* Preloader style3 */
.veda-preloader__item--3 {
  font-size: 4px;
  text-indent: -9999em;
  width: 9em;
  height: 9em;
  border-radius: 50%;
  background: var(--veda-preloader-color, var(--color-light-freeze));
  background: -moz-linear-gradient(left, var(--veda-preloader-color, var(--color-light-freeze)) 10%, rgba(255, 255, 255, 0) 42%);
  background: -webkit-linear-gradient(left, var(--veda-preloader-color, var(--color-light-freeze)) 10%, rgba(255, 255, 255, 0) 42%);
  background: -o-linear-gradient(left, var(--veda-preloader-color, var(--color-light-freeze)) 10%, rgba(255, 255, 255, 0) 42%);
  background: -ms-linear-gradient(left, var(--veda-preloader-color, var(--color-light-freeze)) 10%, rgba(255, 255, 255, 0) 42%);
  background: linear-gradient(to right, var(--veda-preloader-color, var(--color-light-freeze)) 10%, rgba(255, 255, 255, 0) 42%);
  position: relative;
  -webkit-animation: load3 1.4s infinite linear;
  animation: load3 1.4s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.veda-preloader__item--3:before {
  width: 50%;
  height: 50%;
  background: var(--veda-preloader-color, var(--color-light-freeze));
  border-radius: 100% 0 0 0;
  position: absolute;
  top: 0;
  left: 0;
  content: '';
}
.veda-preloader__item--3:after {
  background: var(--veda-preloader-background-color, var(--color-primary));
  width: 75%;
  height: 75%;
  border-radius: 50%;
  content: '';
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
@-webkit-keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`;
export default style3;

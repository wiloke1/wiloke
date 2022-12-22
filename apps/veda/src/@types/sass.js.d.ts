declare module 'sass.js' {
  const Sass = {
    compile(scss: string, callback: (result: string) => void): void;,
  };
  export default Sass;
}
declare module 'sass.js/dist/sass.sync' {
  const Sass = {
    compile(scss: string, callback: (result: string) => void): void;,
  };
  export default Sass;
}

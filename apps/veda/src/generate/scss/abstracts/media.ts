const media = `
$breakpoints: (
  xs: 480,
  sm: 768,
  md: 992,
  lg: 1024
);

@mixin media-max($breakpoint) {
  $val: map-get($breakpoints, $breakpoint);
  $val: if($val, $val, $breakpoint);
  $width: $val - 1 + 'px';
  @media (max-width: $width) {
    @content;
  }
}

@mixin media-min($breakpoint) {
  $val: map-get($breakpoints, $breakpoint);
  $val: if($val, $val, $breakpoint);
  $width: $val + 'px';
  @media (min-width: $width) {
    @content;
  }
}
`;

export default media;

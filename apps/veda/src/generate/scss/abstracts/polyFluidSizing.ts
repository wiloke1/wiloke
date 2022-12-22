const polyFluidSizing = `
/// linear-interpolation
/// Calculate the definition of a line between two points
/// @param $map - A SASS map of viewport widths and size value pairs
/// @returns A linear equation as a calc() function
/// @example
///   font-size: linear-interpolation((320px: 18px, 768px: 26px));
/// @author Jake Wilson <jake.e.wilson@gmail.com>
@function linear-interpolation($map) {
	$keys: map-keys($map);
	@if (length($keys) !=2) {
		@error "linear-interpolation() $map must be exactly 2 values";
	}
	// The slope
	$m: (map-get($map, nth($keys, 2)) - map-get($map, nth($keys, 1)))/(nth($keys, 2) - nth($keys, 1));
	// The y-intercept
	$b: map-get($map, nth($keys, 1)) - $m * nth($keys, 1);
	// Determine if the sign should be positive or negative
	$sign: "+";
	@if ($b < 0) {
		$sign: "-";
		$b: abs($b);
	}
	@return calc(#{$m*100}vw #{$sign} #{$b});
}
@function pfs($min, $max) {
	$value: linear-interpolation((
		400px: $min,
		1200px: $max
	));

	@return clamp($min, $value, $max);
}
@mixin pfs($attr, $min, $max) {
	#{$attr}: $max;
	#{$attr}: pfs($min, $max);
}
`;

export default polyFluidSizing;

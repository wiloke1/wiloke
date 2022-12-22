const direction = `
@function replace($string, $search, $replace: '') {
  $index: str-index($string, $search);

  @if $index {
    @return str-slice($string, 1, $index - 1) + $replace + replace(str-slice($string, $index + str-length($search)), $search, $replace);
  }

  @return $string;
}
@function getPropertyWithDirection($property) {
  @if ($property == 'margin-left') {
    @return 'margin-right';
  }
  @if ($property == 'margin-right') {
    @return 'margin-left';
  }
  @if ($property == 'padding-left') {
    @return 'padding-right';
  }
  @if ($property == 'padding-right') {
    @return 'padding-left';
  }
  @if ($property == 'border-left') {
    @return 'border-right';
  }
  @if ($property == 'border-right') {
    @return 'border-left';
  }
  @if ($property == 'border-left-style') {
    @return 'border-right-style';
  }
  @if ($property == 'border-right-style') {
    @return 'border-left-style';
  }
  @if ($property == 'border-left-width') {
    @return 'border-right-width';
  }
  @if ($property == 'border-right-width') {
    @return 'border-left-width';
  }
  @if ($property == 'border-left-color') {
    @return 'border-right-color';
  }
  @if ($property == 'border-right-color') {
    @return 'border-left-color';
  }
  @if ($property == 'left') {
    @return 'right';
  }
  @if ($property == 'right') {
    @return 'left';
  }
  @if ($property == 'border-bottom-left-radius') {
    @return 'border-bottom-right-radius';
  }
  @if ($property == 'border-bottom-right-radius') {
    @return 'border-bottom-left-radius';
  }
  @if ($property == 'border-top-left-radius') {
    @return 'border-top-right-radius';
  }
  @if ($property == 'border-top-right-radius') {
    @return 'border-top-left-radius';
  }
  @return '#{$property}';
}

@function getValueList($values) {
  $result: '';
  @for $i from 1 through length($values) {
    $value: nth($values, $i);
    $result: $result + getPropertyWithDirection($value) + if($i == length($values), '', ', ');
  }
  @return $result;
}

@function getValueWithDirection($value) {
  $_value: $value;
  $_value: replace("#{$_value}", 'translateX(0.', 'translateX(-....0.');
  $_value: replace("#{$_value}", 'translateX(1', 'translateX(-....1');
  $_value: replace("#{$_value}", 'translateX(2', 'translateX(-....2');
  $_value: replace("#{$_value}", 'translateX(3', 'translateX(-....3');
  $_value: replace("#{$_value}", 'translateX(4', 'translateX(-....4');
  $_value: replace("#{$_value}", 'translateX(5', 'translateX(-....5');
  $_value: replace("#{$_value}", 'translateX(6', 'translateX(-....6');
  $_value: replace("#{$_value}", 'translateX(7', 'translateX(-....7');
  $_value: replace("#{$_value}", 'translateX(8', 'translateX(-....8');
  $_value: replace("#{$_value}", 'translateX(9', 'translateX(-....9');
  $_value: replace("#{$_value}", 'translate(0.', 'translate(-....0.');
  $_value: replace("#{$_value}", 'translate(1', 'translate(-....1');
  $_value: replace("#{$_value}", 'translate(2', 'translate(-....2');
  $_value: replace("#{$_value}", 'translate(3', 'translate(-....3');
  $_value: replace("#{$_value}", 'translate(4', 'translate(-....4');
  $_value: replace("#{$_value}", 'translate(5', 'translate(-....5');
  $_value: replace("#{$_value}", 'translate(6', 'translate(-....6');
  $_value: replace("#{$_value}", 'translate(7', 'translate(-....7');
  $_value: replace("#{$_value}", 'translate(8', 'translate(-....8');
  $_value: replace("#{$_value}", 'translate(9', 'translate(-....9');

  $_value: replace("#{$_value}", 'translateX(-0.', 'translateX(0.');
  $_value: replace("#{$_value}", 'translateX(-1', 'translateX(1');
  $_value: replace("#{$_value}", 'translateX(-2', 'translateX(2');
  $_value: replace("#{$_value}", 'translateX(-3', 'translateX(3');
  $_value: replace("#{$_value}", 'translateX(-4', 'translateX(4');
  $_value: replace("#{$_value}", 'translateX(-5', 'translateX(5');
  $_value: replace("#{$_value}", 'translateX(-6', 'translateX(6');
  $_value: replace("#{$_value}", 'translateX(-7', 'translateX(7');
  $_value: replace("#{$_value}", 'translateX(-8', 'translateX(8');
  $_value: replace("#{$_value}", 'translateX(-9', 'translateX(9');
  $_value: replace("#{$_value}", 'translate(-0.', 'translate(0.');
  $_value: replace("#{$_value}", 'translate(-1', 'translate(1');
  $_value: replace("#{$_value}", 'translate(-2', 'translate(2');
  $_value: replace("#{$_value}", 'translate(-3', 'translate(3');
  $_value: replace("#{$_value}", 'translate(-4', 'translate(4');
  $_value: replace("#{$_value}", 'translate(-5', 'translate(5');
  $_value: replace("#{$_value}", 'translate(-6', 'translate(6');
  $_value: replace("#{$_value}", 'translate(-7', 'translate(7');
  $_value: replace("#{$_value}", 'translate(-8', 'translate(8');
  $_value: replace("#{$_value}", 'translate(-9', 'translate(9');

  $_value: replace("#{$_value}", 'calc(0.', 'calc(-....0.');
  $_value: replace("#{$_value}", 'calc(1', 'calc(-....1');
  $_value: replace("#{$_value}", 'calc(2', 'calc(-....2');
  $_value: replace("#{$_value}", 'calc(3', 'calc(-....3');
  $_value: replace("#{$_value}", 'calc(4', 'calc(-....4');
  $_value: replace("#{$_value}", 'calc(5', 'calc(-....5');
  $_value: replace("#{$_value}", 'calc(6', 'calc(-....6');
  $_value: replace("#{$_value}", 'calc(7', 'calc(-....7');
  $_value: replace("#{$_value}", 'calc(8', 'calc(-....8');
  $_value: replace("#{$_value}", 'calc(9', 'calc(-....9');

  $_value: replace("#{$_value}", 'calc(-0.', 'calc(0.');
  $_value: replace("#{$_value}", 'calc(-1', 'calc(1');
  $_value: replace("#{$_value}", 'calc(-2', 'calc(2');
  $_value: replace("#{$_value}", 'calc(-3', 'calc(3');
  $_value: replace("#{$_value}", 'calc(-4', 'calc(4');
  $_value: replace("#{$_value}", 'calc(-5', 'calc(5');
  $_value: replace("#{$_value}", 'calc(-6', 'calc(6');
  $_value: replace("#{$_value}", 'calc(-7', 'calc(7');
  $_value: replace("#{$_value}", 'calc(-8', 'calc(8');
  $_value: replace("#{$_value}", 'calc(-9', 'calc(9');

  $_value: replace("#{$_value}", '- ', '+....');
  $_value: replace("#{$_value}", '+ 0.', '- 0.');
  $_value: replace("#{$_value}", '+ 1', '- 1');
  $_value: replace("#{$_value}", '+ 2', '- 2');
  $_value: replace("#{$_value}", '+ 3', '- 3');
  $_value: replace("#{$_value}", '+ 4', '- 4');
  $_value: replace("#{$_value}", '+ 5', '- 5');
  $_value: replace("#{$_value}", '+ 6', '- 6');
  $_value: replace("#{$_value}", '+ 7', '- 7');
  $_value: replace("#{$_value}", '+ 8', '- 8');
  $_value: replace("#{$_value}", '+ 9', '- 9');
  $_value: replace("#{$_value}", '+....0.', '+ 0.');
  $_value: replace("#{$_value}", '+....1', '+ 1');
  $_value: replace("#{$_value}", '+....2', '+ 2');
  $_value: replace("#{$_value}", '+....3', '+ 3');
  $_value: replace("#{$_value}", '+....4', '+ 4');
  $_value: replace("#{$_value}", '+....5', '+ 5');
  $_value: replace("#{$_value}", '+....6', '+ 6');
  $_value: replace("#{$_value}", '+....7', '+ 7');
  $_value: replace("#{$_value}", '+....8', '+ 8');
  $_value: replace("#{$_value}", '+....9', '+ 9');

  $_value: replace("#{$_value}", '-....0.', '-0.');
  $_value: replace("#{$_value}", '-....1', '-1');
  $_value: replace("#{$_value}", '-....2', '-2');
  $_value: replace("#{$_value}", '-....3', '-3');
  $_value: replace("#{$_value}", '-....4', '-4');
  $_value: replace("#{$_value}", '-....5', '-5');
  $_value: replace("#{$_value}", '-....6', '-6');
  $_value: replace("#{$_value}", '-....7', '-7');
  $_value: replace("#{$_value}", '-....8', '-8');
  $_value: replace("#{$_value}", '-....9', '-9');
  $_value: replace("#{$_value}", 'left', 'right');
  $_value: replace("#{$_value}", 'right', 'left');
  @return unquote(quote($_value));
}

@mixin autoDirection($css) {
  [dir="ltr"] & {
    @each $property, $value in $css {
      #{$property}: $value;
    }
  }
  [dir="rtl"] & {
    @each $property, $value in $css {
      #{getPropertyWithDirection($property)}: getValueWithDirection($value);
    }
  }
}

@mixin ltrDirection {
  [dir="ltr"] & {
    @content;
  }
}

@mixin rtlDirection {
  [dir="rtl"] & {
    @content;
  }
}
`;

export default direction;

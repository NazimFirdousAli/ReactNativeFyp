import { Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const WIDTH_AVG = WIDTH > 361 ? '80%' : '90%';
const DARK_GREEN = '#5EA29F';
const BIOME_GREEN = '#174849';
const BORDER_COLOR = '#dfdfdf';
const bgColor = '#0adc00';
const BLACK = 'black';
const WHITE = '#ffff';
const GRAY = '#F7F8F8';
const LIGHT_BLUE = '#00B7FD';
const LIGHT_COLOR = '#F3F8F8';
const TEXT_BLACK_COLOR = '#767676';
const PLACEHOLDER_COLOR = '#000';
const MYPAGECOLORGREEN = '#5EA29F';
const INPUT_BORDER_COLOR = '#dddddd';
const TEXT_GRAY = 'gray';
const FONT_SIZE=WIDTH * 0.027
const EmailChecker =
/(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
const PhoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im




export {
  bgColor,
  BLACK,
  HEIGHT,
  WIDTH,
  WIDTH_AVG,
  DARK_GREEN,
  WHITE,
  BIOME_GREEN,
  GRAY,
  LIGHT_BLUE,
  MYPAGECOLORGREEN,
  BORDER_COLOR,
  INPUT_BORDER_COLOR,
  TEXT_GRAY,
  LIGHT_COLOR,
  TEXT_BLACK_COLOR,
  PLACEHOLDER_COLOR,
  FONT_SIZE,
  EmailChecker,
  PhoneNumberRegex
};

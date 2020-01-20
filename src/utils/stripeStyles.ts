import { textColor, placeholderColor, invalidColor } from './getCssVariables';

const style = {
  base: {
    iconColor: 'gray',
    color: textColor,
    fontWeight: 600,
    fontFamily: 'Open Sans',
    fontSize: '16px',
    fontSmoothing: 'antialiased',

    ':-webkit-autofill': {
      color: '#fce883'
    },
    '::placeholder': {
      fontFamily: 'Open Sans',
      fontSize: '18px',
      color: placeholderColor
    }
  },
  invalid: {
    iconColor: invalidColor,
    color: invalidColor
  }
};

export default style;

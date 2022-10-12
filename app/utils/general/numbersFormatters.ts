/**
 * Format number to Universal String Format
 * @param num Number to format
 * @param currency Prefix to add to the number format
 * @param applySignMinus Apply sign minus to the number format
 */
export const moneyStringFormat = (
  num: number,
  currency = '₡',
  applySignMinus = true,
) => {
  const numberString = Number(num)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');

  let numberStringPlain = numberString.replace('-', '');
  numberStringPlain = `${currency}${numberStringPlain}`;

  if (applySignMinus) {
    numberStringPlain = `${num < 0 ? '-' : ''}${numberStringPlain}`;
  }
  return numberStringPlain;
};

export const localMoneyFormat = (num: number, currency: string) => {
  let number = '';
  if (num > 0) {
    number = `${currency}${num.toFixed(2).replace('.', ',')}`;
  }

  return number;
};

export const formatInputMoney = (
  text: string,
  numDecimals = 2,
  separator = '.',
  decimalSeparator = ',',
) => {
  const textNumericValue = text.replace(/\D+/g, '');
  const numberValue = Number(textNumericValue);
  const zerosOnValue = textNumericValue.replace(/[^0]/g, '').length;

  let newValue: number;

  if (!textNumericValue || (!numberValue && zerosOnValue === numDecimals)) {
    newValue = 0;
  } else {
    newValue = numberValue / 10 ** numDecimals;
  }
  const string = Math.abs(newValue).toFixed(numDecimals);

  const parts = string.split(separator);
  const buffer = [];

  let number = parts[0];
  while (number.length > 0) {
    buffer.unshift(number.substr(Math.max(0, number.length - 3), 3));
    number = number.substr(0, number.length - 3);
  }

  let formattedNumber = '';
  formattedNumber = buffer.join(separator);

  const decimals = parts[1];
  if (!!numDecimals && decimals) {
    formattedNumber += `${decimalSeparator}${decimals}`;
  }

  return formattedNumber === `0${separator}${''.padStart(numDecimals, '0')}`
    ? ''
    : formattedNumber;
};

export const formattedToNumber = (stringNumber: string): number => {
  const removedDot = stringNumber.replace(/\./g, '');
  const removedComma = removedDot.replace(/,/g, '.');
  const numberFormatted = Number(removedComma);
  return numberFormatted;
};

export const formatHandler = (
  value: string,
): {formattedNumber: string; realNumber: number} => {
  if (value) {
    const result = {
      formattedNumber: formatInputMoney(value),
      realNumber: formattedToNumber(formatInputMoney(value)),
    };
    return result;
  } else {
    return {
      formattedNumber: '',
      realNumber: 0,
    };
  }
};

export const onlyNumbers = (value: string) => {
  let num = '';
  if (value) {
    num = value.replace(/[^0-9]/g, '');
    return num;
  }
  return num;
};

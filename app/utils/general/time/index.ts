import parse from 'date-fns/parse';
import format from 'date-fns/format';
import fromUnixTime from 'date-fns/fromUnixTime';
import {DATE_SHORT_FORMAT} from './formats';

export const finishDateProcessorForm = (dateFromInput: string) => {
  const parsedDate = parse(dateFromInput, 'yyyy-MM-dd', new Date()).getTime();
  return parsedDate;
};

export const getDateFromString = (dateFromInput: any) => {
  const year = Number(dateFromInput.slice(0, 4));
  const month = Number(dateFromInput.slice(5, 7)) - 1;
  const day = Number(dateFromInput.slice(8, 10));

  const unixDate = new Date(year, month, day);
  return unixDate;
};

export const getDateFromUNIX = (unixTime: number) => {
  const date = fromUnixTime(unixTime);
  return date;
};

export const getStringDateFromDate = (date: Date) => {
  const formatted = format(date, DATE_SHORT_FORMAT);
  return formatted;
};

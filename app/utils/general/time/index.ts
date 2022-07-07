import {DATE_SHORT_FORMAT} from './formats';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import fromUnixTime from 'date-fns/fromUnixTime';
import addHours from 'date-fns/addHours';
import getHours from 'date-fns/getHours';
import getMinutes from 'date-fns/getMinutes';
import getSeconds from 'date-fns/getSeconds';
import differenceInSeconds from 'date-fns/differenceInSeconds';

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

export const convertToDuration = (secondsAmount: number) => {
  const normalizeTime = (time: string): string =>
    time.length === 1 ? `0${time}` : time;

  const SECONDS_TO_MILLISECONDS_COEFF = 1000;
  const MINUTES_IN_HOUR = 60;

  const milliseconds = secondsAmount * SECONDS_TO_MILLISECONDS_COEFF;

  const date = new Date(milliseconds);
  const timezoneDiff = date.getTimezoneOffset() / MINUTES_IN_HOUR;
  const dateWithoutTimezoneDiff = addHours(date, timezoneDiff);

  const hours = normalizeTime(String(getHours(dateWithoutTimezoneDiff)));
  const minutes = normalizeTime(String(getMinutes(dateWithoutTimezoneDiff)));
  const seconds = normalizeTime(String(getSeconds(dateWithoutTimezoneDiff)));

  const hoursOutput = hours !== '00' ? `${hours}hs ` : '';
  const minutesOutput = minutes !== '00' ? `${minutes}min ` : '';

  return `${hoursOutput && hoursOutput}${
    minutesOutput && minutesOutput
  }${seconds}seg`;
};

export const getDifferenceInSeconds = (
  dateLater: Date | number,
  dateEarlier: Date | number,
  roundingMethod?: string,
):number => {
  const seconds = differenceInSeconds(dateLater, dateEarlier, {roundingMethod});
  return seconds;
};

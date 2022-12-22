import { i18n } from 'translation';
import { translation } from 'translation/translation';

type TranslationName = keyof typeof translation.en.time;

const ONE_MINUTE = 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_WEEK = ONE_DAY * 7;
const ONE_MONTH = ONE_DAY * 30;

function getCount(seconds: number, num: number) {
  return Math.floor(seconds / num);
}

function getText(seconds: number, num: number, textSingular: TranslationName, textPlural: TranslationName) {
  const s = getCount(seconds, num);
  const timeName = s > 1 ? textPlural : textSingular;
  return i18n.t(`time.${timeName}`, { s: s.toString() });
}

export function getDate(timestamp: number) {
  return new Intl.DateTimeFormat(navigator.language).format(new Date(timestamp));
}

export function timeAgo(timestamp: number, date: string) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds >= ONE_MONTH) {
    return date;
  }
  if (seconds >= ONE_WEEK) {
    return getText(seconds, ONE_WEEK, 'weekAgo', 'weeksAgo');
  }
  if (seconds >= ONE_DAY) {
    return getText(seconds, ONE_DAY, 'dayAgo', 'daysAgo');
  }
  if (seconds >= ONE_HOUR) {
    return getText(seconds, ONE_HOUR, 'hourAgo', 'hoursAgo');
  }
  if (seconds >= ONE_MINUTE) {
    return getText(seconds, ONE_MINUTE, 'minuteAgo', 'minutesAgo');
  }
  if (seconds >= 0 && seconds < ONE_MINUTE) {
    return i18n.t('time.justNow');
  }
  return date;
}

export function timeConverter(UNIX_timestamp: number) {
  const a = new Date(UNIX_timestamp);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const time = date + '/' + month + '/' + year;
  return time;
}

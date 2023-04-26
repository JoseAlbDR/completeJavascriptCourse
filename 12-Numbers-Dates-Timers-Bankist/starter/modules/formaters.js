/**
 * Format a movement date depending on when happened
 * @param {*} date
 * @param {*} locale
 * @returns
 */
const formatMovementDate = (date, locale) => {
  // Format Date String
  const daysPassed = calcDaysPassed(date, new Date());

  if (daysPassed < 1 && daysPassed >= 0) return 'Today';
  if (daysPassed >= 1 && daysPassed < 2) return `yesterday`;
  if (daysPassed >= 2 && daysPassed <= 4) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat(locale, options).format(date);
};

/**
 * Format number into locale string and currency
 * @param {*} locale
 * @param {*} number
 * @param {*} currency
 * @returns
 */
const formatCurrency = (locale, value, currency) => {
  const options = {
    // style: 'unit',
    // style: 'percent',
    style: 'currency',
    // unit: 'mile-per-hour',
    // unit: 'celsius',
    currency: currency,
    // useGrouping: false,
  };
  return new Intl.NumberFormat(locale, options).format(value);
};

/**
 * Format date to acc locale
 * @param {*} date
 * @param {*} locale
 * @returns
 */
const formatIntlDate = (date, locale) => {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    year: 'numeric',
    month: 'long',
    weekday: 'long',
  };
  // const locale = navigator.languaje;
  return new Intl.DateTimeFormat(locale, options).format(date);
};

export { formatIntlDate, formatCurrency, formatMovementDate };

// utils/number.js

export const toPersianNumber = (value) => {
  return new Intl.NumberFormat("fa-IR").format(value);
};

export const toPersianDigits = (text) => {
  return String(text).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
};
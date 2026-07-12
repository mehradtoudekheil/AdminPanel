import dayjs from "dayjs";
import jalaliday from "jalaliday";
import { toPersianDigits } from "./number";

dayjs.extend(jalaliday);

// تاریخ شمسی
export const formatJalaliDate = (date) => {
  return toPersianDigits(
    dayjs(date)
      .calendar("jalali")
      .locale("fa")
      .format("YYYY/MM/DD")
  );
};

// امروز، دیروز یا تاریخ
export const formatCreatedAt = (date) => {
  const today = dayjs().calendar("jalali");
  const target = dayjs(date).calendar("jalali");

  if (today.isSame(target, "day")) {
    return "امروز";
  }

  if (today.subtract(1, "day").isSame(target, "day")) {
    return "دیروز";
  }

  return toPersianDigits(
    target.locale("fa").format("D MMMM YYYY")
  );
};

// تاریخ امروز
export const getTodayJalali = () => {
  return toPersianDigits(
    dayjs()
      .calendar("jalali")
      .locale("fa")
      .format("dddd D MMMM YYYY")
  );
};
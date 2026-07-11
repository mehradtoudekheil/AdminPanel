import dayjs from "dayjs";
import jalaliday from "jalaliday";

dayjs.extend(jalaliday);

export const getTodayJalali = () => {
  return dayjs()
    .calendar("jalali")
    .locale("fa")
    .format("dddd D MMMM YYYY");
};
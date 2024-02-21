import dayjs from "dayjs";
import { solar2lunar } from "@tenado/lunarjs";
import char8 from "@tenado/char8";
/**
 * 根据年月日时分秒，获取八字
 *
*/
export const getChar8 = (year, month, day) => {
  return char8(year, month, day)
}

/**
 * 根据年月日，获取阴历日期
 *
*/
export const getLunar = (year, month, day) => {
  return solar2lunar(year, month, day);
}


/**
 * 根据date日期，分别获取年、月、日
 *
*/
export const getYearMonthDay = (date, time) => {
  let year, month, day, hour, minute, second;
  const dayjsDate = dayjs(`${date} ${time}`);
  year = dayjsDate.year();
  month = dayjsDate.month();
  day = dayjsDate.date();
  hour = dayjsDate.hour()
  minute = dayjsDate.minute()
  second = dayjsDate.second()
  return {
    year,
    month: month + 1,
    day,
    hour,
    minute,
    second,
  }
}
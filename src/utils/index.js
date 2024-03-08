import dayjs from "dayjs";
import { solar2lunar } from "@tenado/lunarjs";
import char8 from "@tenado/char8";
import element5 from "@tenado/element5";
import cnchar from "@tenado/cnchar";

export const utilRandom = (arr) => {
  const length = arr.length;
  const randomIndex = Math.floor(Math.random() * length);
  return arr[randomIndex];
};

export const getCnChar = (info, nums = 50) => {
  // 字的笔画不要太多
  // 不用生僻字
  // 相同部首的字
  // 两个字读音相识
  // 前后鼻音如lian liang、yin ying、wen wei
  let results = [];
  const surname = info?.element5?.surname;
  const supplyOf = info?.element5?.supplyOf;
  const surConfig = cnchar.find(item => item.char === surname) ?? {};
  const getName = (info) => {
    let result = [];
    const { sex } = info;
    const firstConfig = utilRandom(
      cnchar.filter((item) => (!item.sex || item.sex === sex) && (!item.five || item.pinyin !== surConfig.pinyin) && (!item.five || item.five === supplyOf))
    );
    result.push(firstConfig);
    const secondConfig = utilRandom(
      cnchar.filter((item) => (!item.sex || item.sex === sex) && (!item.five || item.pinyin !== surConfig.pinyin) && (item.radical !== firstConfig.radical) && (item.pinyin !== firstConfig.pinyin))
    );
    result.push(secondConfig);
    return result;
  };
  for (let i = 0; i < nums; i++) {
    const name = getName(info);
    results.push(name);
  }
  info.names = results;
};

export const getElement5 = (info) => {
  const {
    yearGan,
    yearZhi,
    monthGan,
    monthZhi,
    dayGan,
    dayZhi,
    timeGan,
    timeZhi,
  } = info.char8 ?? {};
  const char8Arr = [
    yearGan,
    yearZhi,
    monthGan,
    monthZhi,
    dayGan,
    dayZhi,
    timeGan,
    timeZhi,
  ];
  const element5Data = element5(char8Arr);
  info.element5 = element5Data;
};

/**
 * 根据年月日时分秒，获取八字
 *
 */
export const getChar8 = (info) => {
  const dateData = info.dateData;
  let char8Data = char8(dateData.year, dateData.month, dateData.day);
  info.char8 = char8Data;
  return char8Data;
};

/**
 * 根据年月日，获取阴历日期
 *
 */
export const getLunar = (info) => {
  const dateData = info.dateData;
  let lunarData = solar2lunar(dateData.year, dateData.month, dateData.day);
  info.lunar = lunarData;
  return lunarData;
};

/**
 * 根据date日期，分别获取年、月、日
 *
 */
export const getYearMonthDay = (info) => {
  const { date, time } = info;
  let year, month, day, hour, minute, second;
  const dayjsDate = dayjs(`${date} ${time}`);
  year = dayjsDate.year();
  month = dayjsDate.month();
  day = dayjsDate.date();
  hour = dayjsDate.hour();
  minute = dayjsDate.minute();
  second = dayjsDate.second();
  const result = {
    year,
    month: month + 1,
    day,
    hour,
    minute,
    second,
  };
  info.dateData = result;
  return result;
};

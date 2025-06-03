import { MeasureUnits, StudentsIcons } from './constants';


export type Normalize<T> = {
  [K in keyof T]-?: T[K] extends string | undefined
    ? string : T[K] extends number | undefined
    ? number : T[K]
}

export type NumericFields<T> = {
  [K in keyof T]: T[K] extends number ? K : never
}[keyof T];

export function normalizeObject<T extends Record<string, any>>(
  data: Partial<T>,
  template: T
): T {
  const normalized: Partial<T> = {};

  for (const key in template) {
    const value = data[key];
    const defaultValue = template[key];

    if (value === undefined || value === null) {
      normalized[key] = defaultValue;
    } else {
      normalized[key] = value;
    }
  }

  return normalized as T;
}


export function getMetric(key: string) {
    if (key in MeasureUnits) {
      return MeasureUnits[key as keyof typeof MeasureUnits]; 
    }
    return 'point'; 
  }

  export function formatDateTime(timestamp: number) {
    const dateObj = new Date(timestamp);

    const weekday = dateObj.toLocaleString('en-US', { weekday: 'short' }); // "Wed"
    const day = dateObj.getDate(); // 7
    const month = dateObj.toLocaleString('en-US', { month: 'short' }); // "Feb"
    const time = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }); // "14:30"

    return {
        date: `${weekday} ${day}`, // "Wed 07"
        time: time // "14:30"
    };
    //const formatted = formatDateTime("2025-02-07T14:30:00Z"); ??? number!!!
    //console.log(formatted.date, formatted.time); // "Wed, 07 Feb" "14:30"
}

export function objectToJson<T>(obj: T): string {
  try {
    return JSON.stringify(obj, null, 2); // Преобразуем в JSON с отступами для читаемости
  } catch (error) {
    console.error('Ошибка при преобразовании в JSON:', error);
    return '{}'; // Возвращаем пустой JSON при ошибке
  }
}

export function getChanges<T extends Record<string, any>>(oldObj: T, newObj: T): Partial<T> {
  const changes: Partial<T> = {};

  Object.keys(newObj).forEach((key) => {
    if (JSON.stringify(oldObj[key]) !== JSON.stringify(newObj[key])) {
      changes[key as keyof T] = newObj[key];
    }
  });

  return changes;
}
//const changedFields = getChangedFields(oldData, newData);

export function getTimestamp(year: number, month: number, week?: number): number {
  const date = new Date(year, month - 1, 1); // первый день месяца

  if (week && week > 0) { // от 0
    const firstDay = date.getDay();  // Найти день недели первого числа месяца (0 — воскресенье, 1 — понедельник, ..., 6 — суббота)
    const offset = week * 7; // Вычисляем смещение до нужной недели
    date.setDate(date.getDate() + offset);
  }
  return date.getTime();
}

export function getYearAndMonth(timestamp: number): { year: number; month: number } {
  const date = new Date(timestamp);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1, // добавляем 1, т.к. месяцы начинаются с 0
  };
}

export function getTodayTimestamp(): number {
  return new Date().getTime();
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}

export function getCurrentMonth(): number {
  return new Date().getMonth() + 1; // getMonth() возвращает 0-11
}

export function isToday(timestamp: number): boolean {
  const date = new Date(timestamp);
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

export function isPast(timestamp: number): boolean {
  const inputDate = new Date(timestamp);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return inputDate < today;
}

export function isFuture(timestamp: number): boolean {
  const inputDate = new Date(timestamp);
  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return inputDate >= tomorrow;
}

export function getWeeksInMonth(year: number, month: number): number {
  const firstDay = new Date(year,  month - 1, 1);
  const lastDay = new Date(year,  month, 0);

  const firstDayOfWeek = firstDay.getDay(); // 0 (вс) – 6 (сб)
  const totalDays = lastDay.getDate();

  const daysWithOffset = totalDays + firstDayOfWeek;
  //alert(daysWithOffset)
  return Math.ceil(daysWithOffset / 7);
}

export function getDayAndWeekday(timestamp: number): { day: number; weekday: string } {
  const date = new Date(timestamp);
  const day = date.getDate(); // число месяца

  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weekday = weekdays[date.getDay()]; // 0 (вс) – 6 (сб)

  return { day, weekday };
}

export function getWeekNumber(timestamp: number): number {//номер недели в месяце
  const date = new Date(timestamp);
  const dayOfMonth = date.getDate();

  // День недели 1-го числа: 0 (Sunday) → 6, 1 (Monday) → 0, ..., 6 (Saturday) → 5
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const startDay = (firstDay.getDay() + 6) % 7;

  return Math.ceil((dayOfMonth + startDay) / 7);
}

export function getWeekHourMinute(timestamp: number) {
  const date = new Date(timestamp);

  // Преобразуем JS day (0 - Sunday, 6 - Saturday) → (1 - Monday, 7 - Sunday)
  const jsDay = date.getDay(); // 0 (Sun) to 6 (Sat)
  const dayOfWeek = jsDay === 0 ? 7 : jsDay;

  const hours = date.getHours();
  const minutes = date.getMinutes();

  return {dayOfWeek, hours, minutes};
}

export function getTimestampForSchedule(weekday: number, hour: number, minute: number): number {

  const now = new Date();
  const currentDay = now.getDay() === 0 ? 7 : now.getDay(); // Convert JS Sunday (0) to 7
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - (currentDay - 1)); // Move to Monday
  startOfWeek.setHours(0, 0, 0, 0); // Reset to 00:00:00.000

  const targetDate = new Date(startOfWeek);
  targetDate.setDate(startOfWeek.getDate() + (weekday - 1)); // Add days
  targetDate.setHours(hour, minute, 0, 0); // Set time

  return targetDate.getTime();
}

export function formatSeconds(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m},${s.toString().padStart(2, "0")}`;
}
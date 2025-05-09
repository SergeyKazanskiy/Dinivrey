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
    return 'ball'; 
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

export function getTimestamp(year: number, month: number): number {
  return new Date(year, month - 1, 1).getTime();
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

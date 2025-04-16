
export const formatDateForRequest = (date: Date): number => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Месяц от 1 до 12
    const day = date.getDate().toString().padStart(2, '0');
    return parseInt(`${year}${month}${day}`);
};

export function getWeekRange(date: Date): { start: number; end: number } {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - (date.getDay() === 0 ? 6 : date.getDay() - 1)); // Понедельник
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Воскресенье

    const formatToYYYYMMDD = (d: Date): number =>
        parseInt(
            `${d.getFullYear()}${(d.getMonth() + 1).toString().padStart(2, '0')}${d
                .getDate()
                .toString()
                .padStart(2, '0')}`
        );
    return {
        start: formatToYYYYMMDD(startOfWeek),
        end: formatToYYYYMMDD(endOfWeek),
    };
}

//const dateForRequest = formatDateForRequest(selectedDate); `https://your-api-url.com/tasks?date=${dateForRequest}`

/*
SELECT * 
FROM Todos 
WHERE date BETWEEN ? AND ? 
ORDER BY date ASC;
*/
from datetime import datetime, timedelta


def get_week_range(year: int, month: int, week_number: int):
    # Первый и последний день месяца
    first_day = datetime(year, month, 1)
    next_month = datetime(year, month + 1, 1) if month < 12 else datetime(year + 1, 1, 1)
    last_day = next_month - timedelta(days=1)

    # Найдём первый понедельник, который может пересекаться с месяцем
    # Это понедельник на неделе, содержащей первый день месяца
    first_monday = first_day - timedelta(days=first_day.weekday())

    # Смещаемся на (week_number - 1) недель от этого понедельника
    week_start = first_monday + timedelta(weeks=week_number - 1)
    week_end = week_start + timedelta(days=6)

    # Если неделя полностью после месяца — её нет
    if week_start > last_day:
        return None

    # Обрезаем границами месяца
    range_start = max(week_start, first_day)
    range_end = min(week_end, last_day)

    # Устанавливаем точное время
    range_start = range_start.replace(hour=0, minute=0, second=0, microsecond=0)
    range_end = range_end.replace(hour=23, minute=59, second=0, microsecond=0)

    return range_start, range_end

def get_week_number(timestamp_ms: int) -> int:
    # Преобразуем миллисекунды в datetime
    date = datetime.fromtimestamp(timestamp_ms / 1000)
    day_of_month = date.day

    # День недели первого числа месяца (0 = понедельник, 6 = воскресенье)
    first_day = datetime(date.year, date.month, 1)
    # Преобразуем к формату: 0 = понедельник, ..., 6 = воскресенье
    start_day = (first_day.weekday())  # Monday=0, Sunday=6 в Python уже по нужному формату

    # Пересчёт как в TS-функции: сколько дней сдвиг + текущий день → неделя
    return (day_of_month + start_day - 1) // 7 + 1


def get_current_week_range():
    now = datetime.now()

    # Найти понедельник текущей недели
    start_of_week = now - timedelta(days=now.weekday())
    start_of_week = start_of_week.replace(hour=0, minute=0, second=0, microsecond=0)

    # Воскресенье этой недели
    end_of_week = start_of_week + timedelta(days=6)
    end_of_week = end_of_week.replace(hour=23, minute=59, second=0, microsecond=0)

    return start_of_week, end_of_week


def get_month_range(year: int, month: int):
    # Первый день месяца
    range_start = datetime(year, month, 1, 0, 0, 0)

    # Первый день следующего месяца
    if month == 12:
        next_month = datetime(year + 1, 1, 1)
    else:
        next_month = datetime(year, month + 1, 1)

    # Последний день месяца
    range_end = next_month - timedelta(seconds=1)
    range_end = range_end.replace(microsecond=0)  # Убираем микросекунды

    return range_start, range_end
import shutil
from pathlib import Path
import re
from typing import Union
from fastapi import UploadFile, HTTPException


def sanitize_name(name: str) -> str:
    return re.sub(r"[^\w\-]", "_", name.strip())

# Folders
def create_folder(base_path: Union[str, Path], folder_name: str) -> Path:
    safe_name = sanitize_name(folder_name)

    path = Path(base_path) / safe_name
    path.mkdir(parents=True, exist_ok=True)
    return path


def delete_folder(base_path: Union[str, Path], folder_name: str):
    safe_name = sanitize_name(folder_name)

    folder_path = Path(base_path) / safe_name
    if folder_path.exists() and folder_path.is_dir():
        shutil.rmtree(folder_path)


def rename_folder(base_path: Union[str, Path], old_name: str, new_name: str) -> Path:
    old_safe = sanitize_name(old_name)
    new_safe = sanitize_name(new_name)

    old_path = Path(base_path) / old_safe
    new_path = Path(base_path) / new_safe

    if not old_path.exists():
        raise FileNotFoundError(f"Folder '{old_path}' does not exist")
    if new_path.exists():
        raise FileExistsError(f"Target folder '{new_path}' already exists")

    old_path.rename(new_path)
    return new_path

# Files
async def save_uploaded_photo(folder: str, filename: str, file: UploadFile) -> Path:
    safe_folder = sanitize_name(folder)
    safe_filename = sanitize_name(filename)

    file_extension = Path(file.filename).suffix.lower()

    if file_extension not in [".jpg", ".jpeg", ".png"]:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    folder_path = Path("images/photos") / safe_folder

    if not folder_path.exists():
        raise HTTPException(status_code=404, detail=f"Folder '{safe_folder}' not found")

    save_path = folder_path / f"{safe_filename}{file_extension}"

    try:
        content = await file.read()
        with open(save_path, "wb") as f:
            f.write(content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save file: {e}")

    return save_path


def delete_file(folder: str, filename: str):
    safe_folder = sanitize_name(folder)
    folder_path = Path("images/photos") / safe_folder
    file_path = folder_path / filename  # filename должен включать расширение

    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")

    try:
        file_path.unlink()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete file: {e}")


def rename_file(folder: str, old_name: str, new_name: str):
    safe_folder = sanitize_name(folder)
    folder_path = Path("images/photos") / safe_folder

    old_path = folder_path / old_name  # old_name и new_name включают расширение
    new_path = folder_path / new_name

    if not old_path.exists():
        raise HTTPException(status_code=404, detail="Source file not found")
    if new_path.exists():
        raise HTTPException(status_code=400, detail="Target file already exists")

    try:
        old_path.rename(new_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to rename file: {e}")
    



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


def format_date_time(timestamp: int) -> dict:
    dt = datetime.fromtimestamp(timestamp / 1000)  # делим на 1000, т.к. timestamp в миллисекундах

    date_str = dt.strftime("%a %d")     # "Wed 07"
    time_str = dt.strftime("%H:%M")     # "14:30"

    return {
        "date": date_str,
        "time": time_str
    }
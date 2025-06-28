from fastapi import FastAPI, APIRouter, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.docs import get_redoc_html
from models.base import Base
from database import engine

from roles.admin.routers import admin_select, admin_create, admin_update, admin_delete
from roles.student.routers import student_select, student_update
from roles.coach.routers import coach_select, coach_create, coach_update, coach_delete
from roles.manager.routers import manager_select, manager_create, manager_update, manager_delete
from fastapi.staticfiles import StaticFiles


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  # Разрешить все методы (GET, POST, OPTIONS и т. д.)
    allow_headers=["*"],  # Разрешить все заголовки
)
app.mount("/images", StaticFiles(directory="images"), name="images")


router = APIRouter()

@router.post("/setup_database", tags=["Auth"])
async def setup_database():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    return {"status": "Success"}

app.include_router(router)
app.include_router(admin_select, prefix="/admin_api")
app.include_router(admin_create, prefix="/admin_api")
app.include_router(admin_update, prefix="/admin_api")
app.include_router(admin_delete, prefix="/admin_api")

app.include_router(student_select, prefix="/student_api")
app.include_router(student_update, prefix="/student_api")

app.include_router(coach_select, prefix="/coach_api")
app.include_router(coach_create, prefix="/coach_api")
app.include_router(coach_update, prefix="/coach_api")
app.include_router(coach_delete, prefix="/coach_api")

app.include_router(manager_select, prefix="/manager_api")
app.include_router(manager_create, prefix="/manager_api")
app.include_router(manager_update, prefix="/manager_api")
app.include_router(manager_delete, prefix="/manager_api")

@app.get("/redoc", include_in_schema=False)
async def custom_redoc_html():
    return get_redoc_html(
        openapi_url="/openapi.json",
        title="My API Docs",
        redoc_favicon_url="https://fastapi.tiangolo.com/img/favicon.png",
        options={"hideDownloadButton": True}  # Отключает правую панель
    )


#if __name__ == '__main__':
 #   uvicorn.run('main:app', reload=True)

#uvicorn main:app --reload
#http://127.0.0.1:8000/docs


from sqlalchemy.ext.asyncio import AsyncSession
from database import get_session
from sqlalchemy import text

router2 = APIRouter()

@router2.post("/add_new_fields", tags=["Auth"])
async def add_new_fields(session: AsyncSession = Depends(get_session)):
    # try:
    #     await session.execute(text("""
    #         ALTER TABLE events ADD COLUMN group1_report BOOLEAN NOT NULL DEFAULT FALSE;
    #     """))
    # except Exception as e:
    #     print("!!!!! error:", e)

    # try:
    #     await session.execute(text("""
    #         ALTER TABLE events ADD COLUMN group2_report BOOLEAN NOT NULL DEFAULT FALSE;
    #     """))
    # except Exception as e:
    #     print("!!!!! error:", e)

    try:
        await session.execute(text("""
            ALTER TABLE group_schedule ADD COLUMN coach_id INTEGER NOT NULL DEFAULT 0;
        """))
    except Exception as e:
        print("!!!!! error:", e)    

    # try:
    #     await session.execute(text("""
    #         ALTER TABLE students ADD COLUMN summary_games TEXT NOT NULL DEFAULT '';
    #     """))
    # except Exception as e:
    #     print("summary_games:", e)

    await session.commit()
    return {"status": "Success"}

app.include_router(router2)


router3 = APIRouter()

@router3.post("/add_new_tables", tags=["Auth"])
async def create_tables():
    async with engine.begin() as conn:
        # создаёт только отсутствующие таблицы
        await conn.run_sync(Base.metadata.create_all)
    await engine.dispose()
    return {"status": "Success"}

app.include_router(router3)


router4 = APIRouter()

@router4.put("/rename_fields", tags=["Auth"])
async def rename_fields(session: AsyncSession = Depends(get_session)):
    try:
        await session.execute(text("""
            ALTER TABLE tests RENAME COLUMN climbing_score TO climbing_time;
        """))
        # await session.execute(text("""
        #     ALTER TABLE tests ALTER COLUMN stamina_time TYPE REAL;
        # """))
    except Exception as e:
        print("!!!!! error:", e)
    
    await session.commit()
    return {"status": "Success"}

app.include_router(router4)


router5 = APIRouter()

@router5.put("/change_field_type", tags=["Auth"])
async def change_field_type(session: AsyncSession = Depends(get_session)):

    try:
        # 1. Создаём временную таблицу с изменённым типом поля `stamina_time` (FLOAT)
        await session.execute(text("""
            CREATE TABLE tests_temp (
                id INTEGER PRIMARY KEY,
                timestamp INTEGER NOT NULL,
                date TEXT NOT NULL,
                speed FLOAT NOT NULL,
                stamina FLOAT NOT NULL,
                climbing FLOAT NOT NULL,
                evasion FLOAT NOT NULL,
                hiding FLOAT NOT NULL,
                speed_time INTEGER NOT NULL DEFAULT 0,
                stamina_time FLOAT NOT NULL DEFAULT 0,
                climbing_time INTEGER NOT NULL DEFAULT 0,
                student_id INTEGER,
                FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE
            );
        """))

        # 2. Копируем данные из старой таблицы
        await session.execute(text("""
            INSERT INTO tests_temp (
                id, timestamp, date, speed, stamina, climbing,
                evasion, hiding, speed_time, stamina_time, climbing_time, student_id
            )
            SELECT
                id, timestamp, date, speed, stamina, climbing,
                evasion, hiding, speed_time, stamina_time, climbing_time, student_id
            FROM tests;
        """))

        # 3. Удаляем старую таблицу
        await session.execute(text("DROP TABLE tests;"))

        # 4. Переименовываем временную таблицу обратно
        await session.execute(text("ALTER TABLE tests_temp RENAME TO tests;"))

        await session.commit()
        print("Поле stamina_time успешно изменено на FLOAT.")
    except Exception as e:
        await session.rollback()
        print(f"Ошибка при изменении: {e}")

    
    #await session.commit()
    return {"status": "Success"}

app.include_router(router5)
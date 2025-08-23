from fastapi import FastAPI, APIRouter, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.docs import get_redoc_html
from models.base import Base
from database import engine

from auth.routers import router as auth_router
from roles.admin.routers import admin_select, admin_create, admin_update, admin_delete
from roles.student.routers import student_select, student_update
from roles.coach.routers import coach_select, coach_create, coach_update, coach_delete
from roles.manager.routers import manager_select, manager_create, manager_update, manager_delete

from fastapi.staticfiles import StaticFiles
from auth.auth_utils import get_decoded_token


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
app.include_router(auth_router)

app.include_router(admin_select, prefix="/admin_api") #get_decoded_token?
app.include_router(admin_create, prefix="/admin_api")
app.include_router(admin_update, prefix="/admin_api")
app.include_router(admin_delete, prefix="/admin_api")

app.include_router(student_select, prefix="/student_api", dependencies=[Depends(get_decoded_token)])
app.include_router(student_update, prefix="/student_api", dependencies=[Depends(get_decoded_token)])

app.include_router(coach_select, prefix="/coach_api", dependencies=[Depends(get_decoded_token)])
app.include_router(coach_create, prefix="/coach_api", dependencies=[Depends(get_decoded_token)])
app.include_router(coach_update, prefix="/coach_api", dependencies=[Depends(get_decoded_token)])
app.include_router(coach_delete, prefix="/coach_api", dependencies=[Depends(get_decoded_token)])

app.include_router(manager_select, prefix="/manager_api", dependencies=[Depends(get_decoded_token)])
app.include_router(manager_create, prefix="/manager_api", dependencies=[Depends(get_decoded_token)])
app.include_router(manager_update, prefix="/manager_api", dependencies=[Depends(get_decoded_token)])
app.include_router(manager_delete, prefix="/manager_api", dependencies=[Depends(get_decoded_token)])

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
            ALTER TABLE events ADD COLUMN duration INTEGER NOT NULL DEFAULT 3600000;
        """))
    except Exception as e:
        print("!!!!! error:", e)    

    # try:
    #     await session.execute(text("""
    #         ALTER TABLE coaches ADD COLUMN firebase_uid TEXT;
    #     """))
    # except Exception as e:
    #     print("!!!!! error:", e)  

    # try:
    #     await session.execute(text("""
    #         ALTER TABLE students ADD COLUMN firebase_uid TEXT NOT NULL DEFAULT '';
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
            ALTER TABLE students RENAME COLUMN firebase_uid TO password;
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
        await session.execute(text("""
            CREATE TABLE rules_new (
                id INTEGER PRIMARY KEY,
                level INTEGER NOT NULL,
                parameter TEXT NOT NULL,
                condition TEXT NOT NULL,
                value FLOAT NOT NULL,
                isPersonal BOOLEAN NOT NULL,
                selection TEXT NOT NULL,
                achieve_id INTEGER,
                FOREIGN KEY(achieve_id) REFERENCES achieves(id) ON DELETE CASCADE
            )
        """))

        # 2. Копируем данные из старой таблицы
        await session.execute(text("""
            INSERT INTO rules_new (id, level, parameter, condition, value, isPersonal, selection, achieve_id)
            SELECT id, level_tmp, parameter, condition, value, isPersonal, selection, achieve_id
            FROM rules
        """))

        await session.execute(text("DROP TABLE rules"))
        await session.execute(text("ALTER TABLE rules_new RENAME TO rules"))

        await session.commit()
    except Exception as e:
        await session.rollback()
        print(f"Ошибка при изменении: {e}")

    return {"status": "Success"}

app.include_router(router5)

# Delete table
router6 = APIRouter()

@router6.delete("/drop_table/{table_name}", tags=["Auth"])
async def drop_table(table_name: str):
    valid_tables = {"games", "gamers"}  # ✅ Белый список разрешённых к удалению таблиц

    if table_name not in valid_tables:
        return {"error": "Table not allowed to be dropped"}

    async with engine.begin() as conn:
        try:
            # ✅ Обернули raw SQL в text()
            await conn.execute(text(f'DROP TABLE IF EXISTS {table_name}'))
            return {"status": f"Table '{table_name}' dropped successfully"}
        except Exception as e:
            return {"error": str(e)}
        
app.include_router(router6)


router7 = APIRouter()
@router7.post("/fix-achievements-level", tags=["Auth"])
async def change_achievement_level_type(session: AsyncSession = Depends(get_session)):
    # если нужно маппить строковые значения, то сделай словарь
    mapping = {
        "Common": 1,
        "Rare": 2,
        "Epic": 3,
        "Mythic": 4,
        "Legendary": 5,
    }

    # 1. Создаём новую таблицу с level INTEGER
    await session.execute(text("""
        CREATE TABLE achievements_new (
            id INTEGER PRIMARY KEY,
            achieve_id INTEGER NOT NULL,
            in_profile BOOLEAN DEFAULT 0,
            level INTEGER NOT NULL,
            student_id INTEGER,
            FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE
        )
    """))

    # 2. Переносим данные с преобразованием level
    for key, val in mapping.items():
        await session.execute(text("""
            INSERT INTO achievements_new (id, achieve_id, in_profile, level, student_id)
            SELECT id, achieve_id, in_profile, :val, student_id
            FROM achievements
            WHERE level = :key
        """), {"val": val, "key": key})

    # 3. Удаляем старую таблицу
    await session.execute(text("DROP TABLE achievements"))

    # 4. Переименовываем
    await session.execute(text("ALTER TABLE achievements_new RENAME TO achievements"))

    await session.commit()
    return {"status": "ok"}

app.include_router(router7)
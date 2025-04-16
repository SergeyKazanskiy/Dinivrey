from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.docs import get_redoc_html
from models.base import Base
from database import engine

from roles.admin.routers import admin_select, admin_create, admin_update, admin_delete
from roles.student.routers import student_select
from roles.coach.routers import coach_select, coach_create, coach_update, coach_delete
from roles.manager.routers import manager_select, manager_create, manager_update, manager_delete


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  # Разрешить все методы (GET, POST, OPTIONS и т. д.)
    allow_headers=["*"],  # Разрешить все заголовки
)

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
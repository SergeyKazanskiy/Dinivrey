from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.staticfiles import StaticFiles
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from typing import List
import shutil
import os

# Настройки
DATABASE_URL = "sqlite:///./users.db"
UPLOAD_FOLDER = "images"

# Инициализация
app = FastAPI()
Base = declarative_base()
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Модель пользователя
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    image_path = Column(String, index=True)

Base.metadata.create_all(bind=engine)

# Статика для изображений
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.mount("/images", StaticFiles(directory=UPLOAD_FOLDER), name="images")

# API эндпоинт: получить список пользователей
@app.get("/users", response_model=List[dict])
def get_users():
    db = SessionLocal()
    users = db.query(User).all()
    return [{"id": user.id, "name": user.name, "image_url": f"/images/{user.image_path}"} for user in users]

# API эндпоинт: загрузить пользователя
@app.post("/users")
async def add_user(name: str, image: UploadFile = File(...)):
    db = SessionLocal()
    image_path = f"{UPLOAD_FOLDER}/{image.filename}"
    with open(image_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    user = User(name=name, image_path=image.filename)
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"id": user.id, "name": user.name, "image_url": f"/images/{user.image_path}"}

from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase
from models.base import Base


DATABASE_URL = "sqlite+aiosqlite:///database.db"

engine = create_async_engine(DATABASE_URL, echo=True)
new_session = async_sessionmaker(engine, expire_on_commit=False)

async def get_session():
    async with new_session() as session:
        yield session



#SessionLocal = async_sessionmaker(engine, expire_on_commit=False)

#def get_db():
 #   db = SessionLocal()
  #  try:
  #      yield db
  #  finally:
  #      db.close()

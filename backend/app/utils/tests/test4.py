from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from fastapi import HTTPException
from backend.app.models.events import Student, Group  # Импортируем модели
from typing import Type, Any, Dict


class CRUDWrapper:
    models = {"students": Student, "groups": Group}

    @classmethod
    async def execute(cls, db: AsyncSession, table: str, operation: str, **params):
        if table not in cls.models:
            raise HTTPException(status_code=400, detail="Invalid table name")

        model: Type[Any] = cls.models[table]

        if operation == "create":
            return await cls.create(db, model, params)
        elif operation == "read":
            return await cls.read(db, model, params.get("id"))
        elif operation == "update":
            return await cls.update(db, model, params.get("id"), params)
        elif operation == "delete":
            return await cls.delete(db, model, params.get("id"))
        else:
            raise HTTPException(status_code=400, detail="Invalid operation")

    @staticmethod
    async def create(db: AsyncSession, model: Type[Any], params: Dict):
        new_entry = model(**params)
        db.add(new_entry)
        await db.commit()
        await db.refresh(new_entry)
        return new_entry

    @staticmethod
    async def read(db: AsyncSession, model: Type[Any], entry_id: int):
        query = select(model).where(model.id == entry_id)
        result = await db.execute(query)
        entry = result.scalars().first()
        if not entry:
            raise HTTPException(status_code=404, detail="Entry not found")
        return entry

    @staticmethod
    async def update(db: AsyncSession, model: Type[Any], entry_id: int, params: Dict):
        query = select(model).where(model.id == entry_id)
        result = await db.execute(query)
        entry = result.scalars().first()
        if not entry:
            raise HTTPException(status_code=404, detail="Entry not found")

        for key, value in params.items():
            if key != "id" and hasattr(entry, key):
                setattr(entry, key, value)

        await db.commit()
        await db.refresh(entry)
        return entry

    @staticmethod
    async def delete(db: AsyncSession, model: Type[Any], entry_id: int):
        query = select(model).where(model.id == entry_id)
        result = await db.execute(query)
        entry = result.scalars().first()
        if not entry:
            raise HTTPException(status_code=404, detail="Entry not found")

        await db.delete(entry)
        await db.commit()
        return {"message": "Entry deleted"}


from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.main import DBDep
from crud_wrapper import CRUDWrapper

router = APIRouter()

@router.post("/{table}")
async def create_entry(table: str, params: dict, db: DBDep):
    return await CRUDWrapper.execute(db, table, "create", **params)

@router.get("/{table}/{entry_id}")
async def read_entry(table: str, entry_id: int, db: DBDep):
    return await CRUDWrapper.execute(db, table, "read", id=entry_id)

@router.put("/{table}/{entry_id}")
async def update_entry(table: str, entry_id: int, params: dict, db: DBDep):
    return await CRUDWrapper.execute(db, table, "update", id=entry_id, **params)

@router.delete("/{table}/{entry_id}")
async def delete_entry(table: str, entry_id: int, db: DBDep):
    return await CRUDWrapper.execute(db, table, "delete", id=entry_id)

from fastapi import UploadFile, File, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from pathlib import Path
from typing import cast, Tuple
import re
from models import Student, Group, Camp, Coach
from roles.admin.schemas import ResponseOk
import shutil
from crud import CRUD


UPLOAD_FOLDER = "images/photos"

def sanitize_name(name: str) -> str:
    return re.sub(r"[^\w\-]", "_", name.strip())

def is_valid_name(name: str) -> bool:
    return bool(re.match(r"^[\w\-]+$", name))


# --------------------------------------- Student ---------------------------------------------

class PhotoStorageService:

    # UPLOAD PHOTO
    @staticmethod
    async def upload_student_photo(student_id: int, file: UploadFile, session: AsyncSession) -> ResponseOk:
    
        # 1.Checking the file extension 
        file_ext = Path(file.filename).suffix.lower()

        if file_ext not in [".jpg", ".jpeg", ".png"]:
            return ResponseOk(isOk=False, error_code=400, error_message="Unsupported file type")
        
        # 2.Getting the student and his group and camp
        stmt = (
            select(Student, Group, Camp)
            .join(Group, Student.group_id == Group.id)
            .join(Camp, Group.camp_id == Camp.id)
            .where(Student.id == student_id)
        )
        result = await session.execute(stmt)
        row: Tuple[Student, Group, Camp] = result.first()

        if not row:
            return ResponseOk(isOk=False, error_code=404, error_message="Student, group or camp not found")

        student, group, camp = row

        # 3.Forming the names (replacing invalid characters)
        camp_name = sanitize_name(camp.name)
        group_name = sanitize_name(group.name)
        student_name = sanitize_name(f"{student.last_name}_{student.first_name}_{student.id}")

        # 4.Creating the folder object
        folder = Path(UPLOAD_FOLDER) / camp_name / 'students' / group_name

        # 5.Deleting the old student photo (if it exist)
        student_photo_name: str = student.photo

        if student_photo_name != "":
            old_photo_path = Path(folder) / student_photo_name

            if old_photo_path.exists():
                try:
                    old_photo_path.unlink()
                except Exception as e:
                    return ResponseOk(isOk=False, error_code=500, error_message="Failed to remove old student photo: {e}")

        # 6.Create the necessary folders (if they do not exist yet)
        folder.mkdir(parents=True, exist_ok=True)

        # 7.Saving the file (or replace if file exist)
        file_name = f"{student_name}{file_ext}"
        path = folder.joinpath(file_name)
        
        try:
            with open(path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to save file: {e}")
        
        return {"isOk": await CRUD.update(Student, student.id, {"photo": file_name}, session)}

    # RENAME PHOTO
    @staticmethod
    async def rename_student_photo(
        student_id: int,
        new_first_name: str,
        new_last_name: str,
        session: AsyncSession
    ) -> ResponseOk:
        
        # 1.Getting the student and his group and camp
        stmt = (
            select(Student, Group, Camp)
            .join(Group, Student.group_id == Group.id)
            .join(Camp, Group.camp_id == Camp.id)
            .where(Student.id == student_id)
        )
        result = await session.execute(stmt)
        row: Tuple[Student, Group, Camp] = result.first()

        if not row:
            return ResponseOk(isOk=False, error_code=404, error_message="Student, group or camp not found")

        student, group, camp = row

        # 2.Getting the student's photo name (finish if there is no photo yet)
        student_photo_name: str = student.photo

        if student_photo_name == '':
            return ResponseOk(isOk=True) # Finish. Student has no photo!

        # 3.Forming the names (replacing invalid characters)
        camp_name = sanitize_name(camp.name)
        group_name = sanitize_name(group.name)

        # 4.Creating the folder object
        folder = Path(UPLOAD_FOLDER) / camp_name / 'students' / group_name

        # 5.Checking if the old student photo exist
        old_photo_path = Path(folder) / student_photo_name

        if not old_photo_path.exists():
            return ResponseOk(isOk=False, error_code=404, error_message="Old photo file does not exist")
        
        # 6.Rename photo
        file_ext = Path(old_photo_path).suffix
        new_photo_name = sanitize_name(f"{new_last_name}_{new_first_name}_{student.id}") + file_ext
        
        new_photo_path = folder.joinpath(new_photo_name)

        try:
            old_photo_path.rename(new_photo_path)
        except Exception as e:
            return ResponseOk(isOk=False, error_code=500, error_message=f"Failed to rename photo: {e}")

        return ResponseOk(isOk= await CRUD.update(Student, student.id, {"photo": new_photo_name}, session))

    # DELETE PHOTO
    @staticmethod
    async def delete_student_photo(student_id: int, session: AsyncSession) -> ResponseOk:

        # 1.Getting the file extension 
        stmt = (
            select(Student, Group, Camp)
            .join(Group, Student.group_id == Group.id)
            .join(Camp, Group.camp_id == Camp.id)
            .where(Student.id == student_id)
        )
        result = await session.execute(stmt)
        row: Tuple[Student, Group, Camp] = result.first()

        if not row:
            return ResponseOk(isOk=False, error_code=404, error_message="Student or related group/camp not found")

        student, group, camp = row

        # 2.Getting the student's photo name (finish if there is no photo yet)
        student_photo_name: str = student.photo

        if student_photo_name == '':
            return ResponseOk(isOk=True) # Finish. Student has no photo!

        # 3.Creating the path object
        camp_name = sanitize_name(camp.name)
        group_name = sanitize_name(group.name)

        folder = Path(UPLOAD_FOLDER) / camp_name / 'students' / group_name
        path = Path(folder).joinpath(student_photo_name)

        # 4.Checking if file exist (if no - Error! File have to exist!)
        if not path.exists():
            return ResponseOk(isOk=False, error_code=405, error_message="Something is wrong, the specified file is not there")

        # 5.Deleting the student photo file
        try:
            path.unlink()
        except Exception as e:
            return ResponseOk(isOk=False, error_code=500, error_message=f"Failed to delete photo: {e}")

        return ResponseOk(isOk=True)
    


# --------------------------------------- Coach ---------------------------------------------

    # UPLOAD PHOTO
    @staticmethod
    async def upload_coach_photo( coach_id: int, file: UploadFile, session: AsyncSession) -> ResponseOk:

        # 1.Checking the file extension 
        file_ext = Path(file.filename).suffix.lower()

        if file_ext not in [".jpg", ".jpeg", ".png"]:
            return ResponseOk(isOk=False, error_code=400, error_message="Unsupported file type")
        
        # 2.Getting the coach and his camp
        stmt = (
            select(Coach, Camp)
            .join(Camp, Coach.camp_id == Camp.id)
            .where(Coach.id == coach_id)
        )
        result = await session.execute(stmt)
        row: Tuple[Coach, Camp] = result.first()

        if not row:
            return ResponseOk(isOk=False, error_code=404, error_message="Coach or camp not found")

        coach, camp = row

        # 3.Forming the names (replacing invalid characters)
        camp_name = sanitize_name(camp.name)
        coach_name = sanitize_name(f"{coach.last_name}_{coach.first_name}_{coach.id}")

        # 4.Creating the folder object
        folder = Path(UPLOAD_FOLDER) / camp_name / 'coaches'

        # 5.Deleting the old student photo (if it exist)
        coach_photo_name: str = coach.photo

        if coach_photo_name != "":
            old_photo_path = Path(folder) / coach_photo_name

            if old_photo_path.exists():
                try:
                    old_photo_path.unlink()
                except Exception as e:
                    return ResponseOk(isOk=False, error_code=500, error_message="Failed to remove old coach photo: {e}")

        # 6.Create the necessary folders (if they do not exist yet)
        folder.mkdir(parents=True, exist_ok=True)

        # 7.Saving the file (or replace if file exist)
        file_name = f"{coach_name}{file_ext}"
        path = folder.joinpath(file_name)
        
        try:
            with open(path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to save file: {e}")
        
        return {"isOk": await CRUD.update(Coach, coach.id, {"photo": file_name}, session)}     

    # RENAME PHOTO
    @staticmethod
    async def rename_coach_photo(
        coach_id: int,
        new_first_name: str,
        new_last_name: str,
        session: AsyncSession
    ) -> ResponseOk:
        from models import Coach, Camp

        # 1.Getting the coach and his camp
        stmt = (
            select(Coach, Camp)
            .join(Camp, Coach.camp_id == Camp.id)
            .where(Coach.id == coach_id)
        )
        result = await session.execute(stmt)
        row: Tuple[Coach, Camp] = result.first()

        if not row:
            return ResponseOk(isOk=False, error_code=404, error_message="Coach or camp not found")

        coach, camp = row

        # 2.Getting the coach's photo name (finish if there is no photo yet)
        coach_photo_name: str = coach.photo
        
        if coach_photo_name == '':
            return ResponseOk(isOk=True) # Finish. Coach has no photo!

        # 3.Creating the folder object
        camp_name = sanitize_name(camp.name)
        folder = Path(UPLOAD_FOLDER) / camp_name / 'coaches'

        # 4.Checking if the old student photo exist
        old_photo_path = Path(folder) / coach_photo_name

        if not old_photo_path.exists():
            return ResponseOk(isOk=False, error_code=404, error_message="Old photo file does not exist")
        
         # 5.Rename photo
        file_ext = Path(old_photo_path).suffix
        new_photo_name = sanitize_name(f"{new_last_name}_{new_first_name}_{coach.id}") + file_ext
        
        new_photo_path = folder.joinpath(new_photo_name)

        try:
            old_photo_path.rename(new_photo_path)
        except Exception as e:
            return ResponseOk(isOk=False, error_code=500, error_message=f"Failed to rename photo: {e}")

        return ResponseOk(isOk= await CRUD.update(Coach, coach.id, {"photo": new_photo_name}, session))

    # DELETE PHOTO
    @staticmethod
    async def delete_coach_photo(coach_id: int, session: AsyncSession) -> ResponseOk:

        # 1.Getting the coach and his  camp
        stmt = (
            select(Coach, Camp)
            .join(Camp, Coach.camp_id == Camp.id)
            .where(Coach.id == coach_id)
        )
        result = await session.execute(stmt)
        row: Tuple[Coach, Camp] = result.first()

        if not row:
            return ResponseOk(isOk=False, error_code=404, error_message="Coach or camp not found")

        coach, camp = row

        # 2.Getting the coach's photo name (finish if there is no photo yet)
        coach_photo_name: str = coach.photo

        if coach_photo_name == '':
            return ResponseOk(isOk=True) # Finish. Student has no photo!

        # 3.Creating the path object
        camp_name = sanitize_name(camp.name)

        folder = Path(UPLOAD_FOLDER) / camp_name / 'coaches'
        path = Path(folder).joinpath(coach_photo_name)

        # 4.Checking if file exist (if no - Error! File have to exist!)
        if not path.exists():
            return ResponseOk(isOk=False, error_code=405, error_message="Something is wrong, the specified file is not there")

        # 5.Deleting the coach photo file
        try:
            path.unlink()
        except Exception as e:
            return ResponseOk(isOk=False, error_code=500, error_message=f"Failed to delete photo: {e}")

        return ResponseOk(isOk=True)



# --------------------------------------- Folders ---------------------------------------------

    # RENAME DIRECTORY
    @staticmethod
    async def rename_camp_folder(camp_id: int, new_name: str, session: AsyncSession) -> ResponseOk:
        
        # 1.Getting camp
        stmt = select(Camp).where(Camp.id == camp_id)
        result = await session.execute(stmt)
        camp = result.scalar_one_or_none()

        if not camp:
            return ResponseOk(isOk=False, error_code=404, error_message="Camp not found")

        # 2.Getting old and new folders
        old_folder = Path(UPLOAD_FOLDER) / sanitize_name(camp.name)
        new_folder = Path(UPLOAD_FOLDER) / sanitize_name(new_name)

        # 3.Checking if exist old folder and not exist folder with new_name
        if not old_folder.exists():
            return ResponseOk(isOk=False, error_code=404, error_message="Old camp folder does not exist")

        if new_folder.exists():
            return ResponseOk(isOk=False, error_code=409, error_message="Cannot rename because a folder with that name already exists")

        # 4.Renaming
        try:
            old_folder.rename(new_folder)
        except Exception as e:
            return ResponseOk(isOk=False, error_code=500, error_message=f"Failed to rename camp folder: {e}")

        return ResponseOk(isOk=True)

    # RENAME FOLDER
    @staticmethod
    async def rename_group_folder(group_id: int, new_name: str, session: AsyncSession) -> ResponseOk:

        # 1.Getting group and his camp
        stmt = (
            select(Group, Camp)
            .join(Camp, Group.camp_id == Camp.id)
            .where(Group.id == group_id)
        )
        result = await session.execute(stmt)
        row: Tuple[Group, Camp] = result.first()

        if not row:
            return ResponseOk(isOk=False, error_code=404, error_message="Group or Camp not found")

        group, camp = row

        # 2.Getting old and new folders
        base_path = Path(UPLOAD_FOLDER) / sanitize_name(camp.name) / "students"
        old_folder = base_path / sanitize_name(group.name)
        new_folder = base_path / sanitize_name(new_name)

        # 3.Checking if exist old folder and not exist folder with new_name
        if not old_folder.exists():
            return ResponseOk(isOk=False, error_code=404, error_message="Old group folder does not exist")

        if new_folder.exists():
            return ResponseOk(isOk=False, error_code=409, error_message="Cannot rename because a folder with that name already exists")

        # 4.Renaming
        try:
            old_folder.rename(new_folder)
        except Exception as e:
            return ResponseOk(isOk=False, error_code=500, error_message=f"Failed to rename group folder: {e}")

        return ResponseOk(isOk=True)
    

    # DELETE DIRECTORY
    @staticmethod
    async def delete_camp_folder(camp_id: int, session: AsyncSession) -> ResponseOk:

        # 1.Getting camp
        stmt = select(Camp).where(Camp.id == camp_id)
        result = await session.execute(stmt)
        camp = result.scalar_one_or_none()

        if not camp:
            return ResponseOk(isOk=False, error_code=404, error_message="Camp not found")

        # 2.Getting folder
        folder_path = Path(UPLOAD_FOLDER) / sanitize_name(camp.name)

        # 3.Checking if exist folder and it is empty    
        if not folder_path.exists():
            return ResponseOk(isOk=False, error_code=404, error_message="Camp folder does not exist")

        if any(folder_path.rglob("*")):
            return ResponseOk(isOk=False, error_code=409, error_message="Camp folder is not empty")

        # 3.Deleting
        try:
            folder_path.rmdir()
        except Exception as e:
            return ResponseOk(isOk=False, error_code=500, error_message=f"Failed to delete camp folder: {e}")

        return ResponseOk(isOk=True)

    # DELETE FOLDER
    @staticmethod
    async def delete_group_folder(group_id: int, session: AsyncSession) -> ResponseOk:

        # 1.Getting group and his camp
        stmt = (
            select(Group, Camp)
            .join(Camp, Group.camp_id == Camp.id)
            .where(Group.id == group_id)
        )
        result = await session.execute(stmt)
        row: Tuple[Group, Camp] = result.first()

        if not row:
            return ResponseOk(isOk=False, error_code=404, error_message="Group or camp not found")

        group, camp = row

        # 2.Getting folder
        folder_path = (
            Path(UPLOAD_FOLDER)
            / sanitize_name(camp.name)
            / "students"
            / sanitize_name(group.name)
        )

         # 3.Checking if exist folder and it is empty
        if not folder_path.exists():
            return ResponseOk(isOk=False, error_code=404, error_message="Group folder does not exist")

        if any(folder_path.iterdir()):
            return ResponseOk(isOk=False, error_code=409, error_message="Group folder is not empty")

        # 3.Deleting
        try:
            folder_path.rmdir()
        except Exception as e:
            return ResponseOk(isOk=False, error_code=500, error_message=f"Failed to delete group folder: {e}")

        return ResponseOk(isOk=True)

   
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Float
from sqlalchemy.orm import relationship
from .base import Base


class Student(Base):
    __tablename__ = 'students'

    id = Column(Integer, primary_key=True, index=True)
    group_id = Column(Integer, ForeignKey('groups.id', ondelete='CASCADE'))
    photo = Column(String, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    gender = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    phone = Column(String, nullable=True)
    active = Column(Boolean, default=True)
    group_extra_id = Column(Integer)
    city = Column(String, nullable=True)
    street = Column(String, nullable=True)
    house = Column(String, nullable=True)
    summary_tests = Column(String, default="", nullable=False)
    summary_achievements = Column(String, default="", nullable=False)
    summary_games = Column(String, default="", nullable=False)
    group = relationship("Group", back_populates="students")
    parents = relationship("Parent", back_populates="student", cascade="all, delete")
    tests = relationship("Test", back_populates="student", cascade="all, delete")
    games = relationship("Game", back_populates="student", cascade="all, delete")
    achievements = relationship("Achievement", back_populates="student", cascade="all, delete")
    attendances = relationship("Attendance", back_populates="students")     

class Parent(Base):
    __tablename__ = 'parents'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    student_id = Column(Integer, ForeignKey('students.id', ondelete='CASCADE'))
    student = relationship("Student", back_populates="parents")


class Test(Base):
    __tablename__ = 'tests'

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(Integer, nullable=False)
    date = Column(String, nullable=False)
    speed = Column(Float, nullable=False)
    stamina = Column(Float, nullable=False)
    climbing = Column(Float, nullable=False)
    evasion = Column(Float, nullable=False)
    hiding = Column(Float, nullable=False)
    speed_time = Column(Integer, default=0, nullable=False)
    stamina_time = Column(Integer, default=0, nullable=False)
    climbing_time = Column(Integer, default=0, nullable=False)
    student_id = Column(Integer, ForeignKey('students.id', ondelete='CASCADE'))
    student = relationship("Student", back_populates="tests")    


class Game(Base):
    __tablename__ = 'games'

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(Integer, nullable=False)
    date = Column(String, nullable=False)
    caughted = Column(Float, nullable=False)
    freeded = Column(Float, nullable=False)
    description = Column(String, nullable=True)
    student_id = Column(Integer, ForeignKey('students.id', ondelete='CASCADE'))
    student = relationship("Student", back_populates="games")


class Achievement(Base):
    __tablename__ = 'achievements'

    id = Column(Integer, primary_key=True, index=True)
    achieve_id = Column(Integer, nullable=False)
    in_profile = Column(Boolean, default=False)
    level = Column(String, nullable=False)
    student_id = Column(Integer, ForeignKey('students.id', ondelete='CASCADE'))
    student = relationship("Student", back_populates="achievements")
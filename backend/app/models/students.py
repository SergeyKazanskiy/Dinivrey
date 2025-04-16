from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
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
    speed = Column(Integer, nullable=False)
    stamina = Column(Integer, nullable=False)
    climbing = Column(Integer, nullable=False)
    evasion = Column(Integer, nullable=False)
    hiding = Column(Integer, nullable=False)
    student_id = Column(Integer, ForeignKey('students.id', ondelete='CASCADE'))
    student = relationship("Student", back_populates="tests")    


class Game(Base):
    __tablename__ = 'games'

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(Integer, nullable=False)
    date = Column(String, nullable=False)
    caughted = Column(Integer, nullable=False)
    freeded = Column(Integer, nullable=False)
    description = Column(String, nullable=True)
    student_id = Column(Integer, ForeignKey('students.id', ondelete='CASCADE'))
    student = relationship("Student", back_populates="games")


class Achievement(Base):
    __tablename__ = 'achievements'

    id = Column(Integer, primary_key=True, index=True)
    achieve_id = Column(Integer, nullable=False)
    student_id = Column(Integer, ForeignKey('students.id', ondelete='CASCADE'))
    student = relationship("Student", back_populates="achievements")
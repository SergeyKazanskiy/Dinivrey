from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Date, DateTime, func
from sqlalchemy.orm import relationship
from database import Base


class Event(Base):
    __tablename__ = 'events'

    id = Column(Integer, primary_key=True, index=True)
    camp_id = Column(Integer, ForeignKey('camps.id', ondelete='CASCADE'))
    timestamp = Column(Integer, nullable=False)
    type = Column(String, nullable=False)
    desc = Column(String)
    group1_id = Column(Integer, nullable=False)
    group2_id = Column(Integer)
    group1_report = Column(Boolean, nullable=False, default=False)
    group2_report = Column(Boolean, nullable=False, default=False)
    attendances = relationship("Attendance", back_populates="event", cascade="all, delete")
    event_drills = relationship("EventDrill", back_populates="event", cascade="all, delete")
    games = relationship("Game", back_populates="event", cascade="all, delete")


class Attendance(Base):
    __tablename__ = 'attendances'

    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey('events.id', ondelete='CASCADE'))
    group_id = Column(Integer, nullable=False)
    student_id = Column(Integer, ForeignKey("students.id"))
    present = Column(Boolean, default=False)
    comment = Column(String)
    event = relationship("Event", back_populates="attendances")
    students = relationship("Student", back_populates="attendances")   
    
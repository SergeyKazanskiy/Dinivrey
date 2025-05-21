from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base


class Drill(Base):
    __tablename__ = "drills"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    time = Column(String, nullable=False)
    level = Column(String, nullable=False)
    link = Column(String, default="", nullable=False)
    desc = Column(String, default="", nullable=False)
    event_drills = relationship("EventDrill", back_populates="drill", cascade="all, delete")


class EventDrill(Base):
    __tablename__ = "event_drills"

    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("events.id", ondelete="CASCADE"), nullable=False)
    drill_id = Column(Integer, ForeignKey("drills.id", ondelete="CASCADE"), nullable=False)
    completed = Column(Boolean, default=False, nullable=False)

    event = relationship("Event", back_populates="event_drills")
    drill = relationship("Drill", back_populates="event_drills")
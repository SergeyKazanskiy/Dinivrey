from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base


class Group(Base):
    __tablename__ = 'groups'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)
    camp_id = Column(Integer, ForeignKey('camps.id', ondelete='CASCADE'))
    camp = relationship("Camp", back_populates="groups")
    students = relationship("Student", back_populates="group", cascade="all, delete")
    coaches = relationship("CoachGroup", back_populates="group", cascade="all, delete")

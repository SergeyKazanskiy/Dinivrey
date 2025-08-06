from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Text
from sqlalchemy.orm import relationship
from database import Base


class Coach(Base):
    __tablename__ = 'coaches'

    id = Column(Integer, primary_key=True, index=True)
    photo = Column(String, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=False)
    active = Column(Boolean, default=True)
    signature = Column(Text, nullable=True)
    camp_id = Column(Integer, ForeignKey('camps.id', ondelete='CASCADE'))
    firebase_uid = Column(String, unique=True, nullable=True)
    groupCoaches = relationship("CoachGroup", back_populates="coach", cascade="all, delete")

class CoachGroup(Base):
    __tablename__ = 'coache_groups'

    id = Column(Integer, primary_key=True, index=True)
    coache_id = Column(Integer, ForeignKey('coaches.id', ondelete='CASCADE'))
    group_id = Column(Integer, ForeignKey('groups.id', ondelete='CASCADE'))
    group = relationship("Group", back_populates="coaches")
    coach = relationship("Coach", back_populates="groupCoaches")
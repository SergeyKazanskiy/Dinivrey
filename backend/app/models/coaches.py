from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from database import Base


class Coach(Base):
    __tablename__ = 'coaches'

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=False)
    active = Column(Boolean, default=True)
    camp_id = Column(Integer, ForeignKey('camps.id', ondelete='CASCADE'))

class CoachGroup(Base):
    __tablename__ = 'coache_groups'

    id = Column(Integer, primary_key=True, index=True)
    coache_id = Column(Integer, ForeignKey('coaches.id', ondelete='CASCADE'))
    group_id = Column(Integer, ForeignKey('groups.id', ondelete='CASCADE'))
    group = relationship("Group", back_populates="coaches")
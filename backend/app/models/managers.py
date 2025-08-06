from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Text
from sqlalchemy.orm import relationship
from database import Base


class Manager(Base):
    __tablename__ = 'managers'

    id = Column(Integer, primary_key=True, index=True)
    camp_id = Column(Integer, ForeignKey('camps.id', ondelete='CASCADE'))
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    firebase_uid = Column(String, unique=True, nullable=True)
    camp = relationship("Camp", back_populates="managers")

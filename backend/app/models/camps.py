from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from .base import Base


class Camp(Base):
    __tablename__ = 'camps'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    city = Column(String, nullable=False)
    groups = relationship("Group", back_populates="camp", cascade="all, delete")
    managers = relationship("Manager", back_populates="camp", cascade="all, delete")

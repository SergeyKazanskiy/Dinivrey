from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from database import Base


class Achieve(Base):
    __tablename__ = 'achieves'

    id = Column(Integer, primary_key=True, index=True)
    image = Column(String, nullable=False)
    name = Column(String, nullable=False)
    desc = Column(String)
    hasRules = Column(Boolean, nullable=False)
    category = Column(String, nullable=False)
    trigger = Column(String, nullable=False)
    effect = Column(String, nullable=False)
    rules = relationship("Rule", back_populates="achieve", cascade="all, delete")


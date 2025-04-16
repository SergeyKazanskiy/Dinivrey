from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Float
from sqlalchemy.orm import relationship
from database import Base


class Rule(Base):
    __tablename__ = 'rules'

    id = Column(Integer, primary_key=True, index=True)
    level = Column(String, nullable=False)
    parameter = Column(String, nullable=False)   
    condition = Column(String, nullable=False)
    value = Column(Float, nullable=False)
    isPersonal = Column(Boolean, nullable=False)
    selection = Column(String, nullable=False)
    achieve_id = Column(Integer, ForeignKey('achieves.id', ondelete='CASCADE'))
    achieve = relationship("Achieve", back_populates="rules")

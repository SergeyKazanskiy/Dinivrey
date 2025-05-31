from sqlalchemy import Column, Integer, String
from .base import Base


class Metric(Base):
    __tablename__ = "metrics"

    id = Column(Integer, primary_key=True, index=True)
    camp_id = Column(Integer, default=0)
    test = Column(String, default="")
    start = Column(Integer, default=0)
    stop = Column(Integer, default=0)
    score = Column(Integer, default=0)

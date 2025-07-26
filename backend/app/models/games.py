from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from database import Base  # или где у тебя определен Base


class Game(Base):
    __tablename__ = 'games'

    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey('events.id', ondelete='CASCADE'))
    group_id = Column(Integer, nullable=False)
    timestamp = Column(Integer, nullable=False)
    first_team = Column(String, nullable=False)

    time1 = Column(Integer, nullable=False)
    time2 = Column(Integer, nullable=False)

    points1 = Column(Integer, nullable=False)
    points2 = Column(Integer, nullable=False)

    tags = Column(Integer, nullable=False)
    rescues = Column(Integer, nullable=False)
    winner = Column(String, nullable=False)
    presence = Column(String, nullable=False)

    event = relationship("Event", back_populates="games")
    gamers = relationship("Gamer", back_populates="game", cascade="all, delete")


class Gamer(Base):
    __tablename__ = 'gamers'

    id = Column(Integer, primary_key=True, index=True)
    game_id = Column(Integer, ForeignKey('games.id', ondelete='CASCADE'))
    student_id = Column(Integer, ForeignKey('students.id', ondelete='CASCADE'))
    name = Column(String, nullable=False)

    team = Column(String, nullable=False)
    caught = Column(Integer, nullable=False)
    freeded = Column(Integer, nullable=False)
    is_survived = Column(Boolean, nullable=False)

    game = relationship("Game", back_populates="gamers")
    student = relationship("Student", back_populates="gamers")

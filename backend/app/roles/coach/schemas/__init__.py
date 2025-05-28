from .shared import ResponseOk, ResponseId
from .group import GroupResponse, StudentShort, GroupScheduleResponse

from .student import StudentResponse, ParentResponse, StudentName, CoachResponse
from .student import TestResponse, Tester, TestUpdate, TestCreate
from .student import GameResponse, GameCreate
from .student import AchievementResponse, AchieveUpdate, AchieveResponse, AchievementCreate
from .student import SummaryTests, SummaryAchievements, SummaryGames

from .event import EventCreate, EventUpdate, EventResponse
from .event import AttendanceDataCreate, AttendanceCreate, AttendanceUpdate, AttendanceResponse
from .drill import EventDrillCreate, EventDrillUpdate, ShortDrillResponse, DrillResponse

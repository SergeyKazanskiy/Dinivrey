from .shared import ResponseOk, ResponseId
from .camp import CampCreate, CampUpdate, CampResponse
from .group import GroupCreate, GroupUpdate, GroupResponse, Group_Students
from .group import GroupReadWithSchedule, GroupScheduleRead, GroupScheduleCreate, GroupScheduleUpdate

from .student import StudentCreate, StudentUpdate, StudentResponse, StudentShort, StudentName
from .student import ParentCreate, ParentUpdate, ParentResponse
from .student import TestCreate, TestUpdate, TestResponse
from .student import GameCreate, GameUpdate, GameResponse
from .student import AchievementCreate, AchievementUpdate, AchievementResponse

from .event import EventCreate, EventUpdate, EventResponse
from .event import AttendanceDataCreate, AttendanceCreate, AttendanceUpdate, AttendanceResponse


from .coach import CoachCreate, CoachUpdate, CoachResponse
from .coach import CoachGroupCreate, CoachGroupResponse

from .achieve import AchieveCreate, AchieveUpdate, AchieveResponse, AchieveShortResponse
from .rule import RuleCreate, RuleUpdate, RuleResponse
from .drill import DrillCreate, DrillResponse, DrillUpdate
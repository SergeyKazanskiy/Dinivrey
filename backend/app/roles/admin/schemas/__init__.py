from .shared import ResponseOk, ResponseId
from .camp import CampCreate, CampUpdate, CampResponse, CampScheduleResponse
from .group import GroupCreate, GroupUpdate, GroupResponse, Group_Students, GroupCoachUpdate, FreeGroupResponse
from .group import GroupReadWithSchedule, GroupScheduleRead, GroupScheduleCreate, GroupScheduleUpdate
from .group import CampTestResponse, CampTestAverages, GroupAchieve


from .student import StudentCreate, StudentUpdate, StudentResponse, StudentShort, StudentName
from .student import ParentCreate, ParentUpdate, ParentResponse
from .student import TestCreate, TestUpdate, TestResponse, StudentTestLider, StudentAchieveLider
from .student import AchievementCreate, AchievementUpdate, AchievementResponse

from .event import EventCreate, EventUpdate, EventResponse
from .event import AttendanceDataCreate, AttendanceCreate, AttendanceUpdate, AttendanceResponse

from .game import GameCreate, GameResponse
from .game import GamerCreate, GamerResponse

from .coach import CoachCreate, CoachUpdate, CoachResponse
from .coach import CoachGroupCreate, CoachGroupResponse, CoachGroup, CoachSchedule, CoachEvent

from .achieve import AchieveCreate, AchieveUpdate, AchieveResponse, AchieveShortResponse
from .rule import RuleCreate, RuleUpdate, RuleResponse
from .drill import DrillCreate, DrillResponse, DrillUpdate

from .settings import MetricBase, MetricCreate, MetricResponse, MetricUpdate
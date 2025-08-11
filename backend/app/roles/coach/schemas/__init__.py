from .shared import ResponseOk, ResponseId
from .group import GroupResponse, StudentShort, GroupScheduleResponse, StudentAvgScore

from .student import StudentResponse, ParentResponse, StudentName, CommentResponse
from .student import TestResponse, Tester, TestUpdate, TestCreate, TestUpdate2
from .student import AchievementResponse, AchieveUpdate, AchieveResponse, AchievementCreate
from .student import SummaryTests, SummaryAchievements, SummaryGames

from .event import EventCreate, EventUpdate, EventResponse, GroupEventsResponse, EventReportResponse
from .event import AttendanceDataCreate, AttendanceCreate, AttendanceUpdate, AttendanceResponse
from .event import AttendanceDataForReport, StudentReport, AttendanceReport
from .drill import EventDrillCreate, EventDrillUpdate, ShortDrillResponse, DrillResponse

from .settings import MetricBase, MetricCreate, MetricResponse, MetricUpdate
from .coach import CoachResponse

from .game import GameCreate, GameResponse
from .game import GamerCreate, GamerResponse, StudentGame
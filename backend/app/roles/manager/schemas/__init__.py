from .shared import ResponseOk, ResponseId

from .coach import CoachResponse, CoachShortResponse, CoachCreate, CoachUpdate
from .coach import CoachGroupResponse, CoachGroupAdd

from .event import EventCreate, EventUpdate, EventResponse, GroupEventsResponse, EventReportResponse
from .event import AttendanceResponse

from .camp import CampResponse

from .group import GroupCreate, GroupResponse, GroupUpdate, StudentName, FreeGroupResponse
from .group import GroupScheduleResponse, GroupScheduleUpdate, GroupScheduleCreate, GroupCoachUpdate

from .student import StudentShort, StudentResponse, ParentResponse, StudentName, CommentResponse
from .student import TestResponse, Tester, TestUpdate, TestCreate, TestUpdate2
from .student import GameResponse, GameCreate
from .student import AchievementResponse, AchieveUpdate, AchieveResponse, AchievementCreate
from .student import SummaryTests, SummaryAchievements, SummaryGames



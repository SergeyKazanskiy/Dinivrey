from .shared import ResponseOk, ResponseId

from .coach import CoachResponse, CoachShortResponse, CoachCreate, CoachUpdate
from .coach import CoachGroupResponse, CoachGroupAdd, CoachSchedualResponse

from .event import EventCreate, EventUpdate, EventResponse, GroupEventsResponse, EventReportResponse
from .event import AttendanceResponse

from .camp import CampResponse, CampScheduleResponse

from .group import GroupCreate, GroupResponse, GroupUpdate, StudentName, FreeGroupResponse
from .group import GroupScheduleResponse, GroupScheduleUpdate, GroupScheduleCreate, GroupCoachUpdate
from .group import GroupTestResponse

from .student import StudentCreate, ParentCreate
from .student import StudentShort, StudentResponse, ParentResponse, StudentName, CommentResponse
from .student import TestResponse, Tester, TestUpdate, TestCreate, TestUpdate2
from .student import GameResponse, GameCreate, StudentGame
from .student import AchievementResponse, AchieveUpdate, AchieveResponse, AchievementCreate
from .student import SummaryTests, SummaryAchievements, SummaryGames



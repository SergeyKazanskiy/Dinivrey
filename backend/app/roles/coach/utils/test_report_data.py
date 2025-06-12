from ..schemas.event import AttendanceReport, StudentReport
from typing import List


def get_test_attendance_data() -> AttendanceReport:
    total_members = 30
    present_members = 28

    students: List[StudentReport] = []
    for i in range(1, total_members + 1):
        is_present = i <= present_members  # первые 28 – присутствуют
        students.append(StudentReport(name=f"FullName {i}", present=is_present))

    report = AttendanceReport(
        date="2025/6/11",
        place="Camp 1",
        group="Group 1",
        time="16-30",
        total_members=total_members,
        present_members=present_members,
        coach_name="John Smith",
        signature="_________________",
        students=students
    )

    return report

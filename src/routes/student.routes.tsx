import MySchedule from '../pages/student/MySchedule';
import OfferedCourse from '../pages/student/OfferedCourse';
import StudentDashboard from '../pages/student/StudentDashboard';
import { TUserPath } from '../types';

export const studentPaths: TUserPath[] = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <StudentDashboard />,
  },
  {
    name: 'Offered Course',
    path: 'offered-course',
    element: <OfferedCourse />,
  },
  {
    name: 'My Schedule',
    path: 'schedule',
    element: <MySchedule />,
  },
];
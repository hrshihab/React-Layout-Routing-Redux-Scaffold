import FacultyDashboard from '../pages/faculty/FacultyDashboard';
import MyCourses from '../pages/faculty/MyCourses';
import MyStudents from '../pages/faculty/MyStudents';
import { TUserPath } from '../types';

export const facultyPaths: TUserPath[] = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <FacultyDashboard />,
  },
  {
    name: 'My Courses',
    path: 'courses',
    element: <MyCourses />,
  },
  {
    path: 'courses/:registerSemesterId/:courseId',
    element: <MyStudents />,
  },
];
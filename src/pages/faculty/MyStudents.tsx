import { Card } from 'antd';
import { useParams } from 'react-router-dom';

const MyStudents = () => {
  const { registerSemesterId, courseId } = useParams();

  return (
    <Card title="My Students">
      Semester: {registerSemesterId}, Course: {courseId}
    </Card>
  );
};

export default MyStudents;
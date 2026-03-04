import { Card } from 'antd';
import { useParams } from 'react-router-dom';

const StudentDetails = () => {
  const { studentId } = useParams();

  return <Card title="Student Details">Student ID: {studentId}</Card>;
};

export default StudentDetails;
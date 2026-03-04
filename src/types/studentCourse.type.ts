export type TOfferedCourse = {
  _id?: string;
  section?: number;
  maxCapacity?: number;
  days?: string[];
  startTime?: string;
  endTime?: string;
  [key: string]: unknown;
};

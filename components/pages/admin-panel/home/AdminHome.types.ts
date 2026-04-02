export type AdminHomeResponseType = {
  latestUsers: {
    id: number;
    firstName: string;
    lastName: string;
    city: {
      id: number;
      name: string;
    };
  }[];
  latestClasses: {
    id: number;
    name: string;
    city: {
      id: number;
      name: string;
    };
  }[];
  stats: {
    totalClasses: number;
    totalStudents: number;
    totalSessions: number;
    averageAttendancePercentage: number;
  };
}
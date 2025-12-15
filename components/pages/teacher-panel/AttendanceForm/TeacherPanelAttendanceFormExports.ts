
export type TeacherPanelStudentType = {
  firstName: string;
  id: number;
  lastName: string;
  mobile: string;
}

export type TeacherPanelStudentsResponseType = {
  students: TeacherPanelStudentType[];
}

export type TeacherPanelAttendanceInfoResponseType = {
  class: {
    id: number;
    name: string;
    teacherId: number;
  };
  classId: number;
  date: string;
  id: number;
  presents: TeacherPanelStudentType[];
}

export type TeacherPanelStudentType = {
  firstName: string;
  id: number;
  lastName: string;
  mobile: string;
}

export type TeacherPanelStudentsResponseType = {
  students: TeacherPanelStudentType[];
}
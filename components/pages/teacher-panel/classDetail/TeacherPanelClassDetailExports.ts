import {TeacherClassType} from "@/components/pages/teacher-panel/classes/TeacherPanelClassesExports";

export type TeacherClassAttendanceType = {
  presentCount: number;
  excusedAbsencesCount: number;
  totalStudents: number;
  date: string;
  id: number;
}

export type TeacherClassInfoType = TeacherClassType & {
  city?: {
    id: number;
    name: string;
  } | null;
  _count?: {
    students: number;
  };
}

export type TeacherClassAttendanceResponseType = {
  attendanceList: TeacherClassAttendanceType[];
  class: TeacherClassInfoType;
}
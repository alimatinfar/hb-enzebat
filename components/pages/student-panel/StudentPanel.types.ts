export type StudentAttendanceStatusType = 'PRESENT' | 'EXCUSED' | 'ABSENT';

export type StudentTeacherType = {
  id: number;
  firstName: string | null;
  lastName: string | null;
  mobile: string;
}

export type StudentClassType = {
  id: number;
  name: string;
  isVirtual: boolean;
  cityId?: number | null;
  city: {
    id: number;
    name: string;
  } | null;
  teacher: StudentTeacherType;
  _count: {
    students: number;
    attendance: number;
  }
}

export type StudentSessionType = {
  id: number;
  date: string;
  status: StudentAttendanceStatusType;
}

export type StudentClassStatsType = {
  totalSessions: number;
  presentCount: number;
  excusedCount: number;
  absentCount: number;
  attendancePercent: number;
}

export type StudentClassDetailType = {
  id: number;
  name: string;
  isVirtual: boolean;
  city: {
    id: number;
    name: string;
  } | null;
  teacher: StudentTeacherType;
  studentsCount: number;
}

export type StudentClassesResponseType = {
  classes: StudentClassType[];
}

export type StudentClassDetailResponseType = {
  class: StudentClassDetailType;
  sessions: StudentSessionType[];
  stats: StudentClassStatsType;
}

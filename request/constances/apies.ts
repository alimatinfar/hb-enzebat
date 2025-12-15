const TEACHER_PANEL_CLASSES = '/teacher/classes'
const TEACHER_PANEL_CLASS_ATTENDANCES = (classId: string) => `${TEACHER_PANEL_CLASSES}/${classId}/attendance`
const TEACHER_PANEL_CLASS_ATTENDANCE_INFO = (classId: string, attendanceId: string) => `${TEACHER_PANEL_CLASS_ATTENDANCES(classId)}/${attendanceId}`

const APIES = {
  //authentication
  LOGIN: '/auth/login',

  //teacher panel
  TEACHER_PANEL_CLASSES: '/teacher/classes',
  TEACHER_PANEL_CLASS_STUDENTS: (classId: string) => `${TEACHER_PANEL_CLASSES}/${classId}/students`,
  TEACHER_PANEL_CLASS_ATTENDANCES: (classId: string) => TEACHER_PANEL_CLASS_ATTENDANCES(classId),
  TEACHER_PANEL_CLASS_ATTENDANCES_ADD: (classId: string) => `${TEACHER_PANEL_CLASS_ATTENDANCES(classId)}/add`,
  TEACHER_PANEL_CLASS_ATTENDANCE_INFO: (classId: string, attendanceId: string) => `${TEACHER_PANEL_CLASS_ATTENDANCE_INFO(classId, attendanceId)}`,
  TEACHER_PANEL_CLASS_ATTENDANCE_EDIT: (classId: string, attendanceId: string) => `${TEACHER_PANEL_CLASS_ATTENDANCE_INFO(classId, attendanceId)}/edit`,
  TEACHER_PANEL_CLASS_ATTENDANCE_DELETE: (classId: string, attendanceId: string) => `${TEACHER_PANEL_CLASS_ATTENDANCE_INFO(classId, attendanceId)}/delete`,
}

export default APIES
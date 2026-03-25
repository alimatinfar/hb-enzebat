const TEACHER_PANEL_CLASSES = '/teacher/classes'
const TEACHER_PANEL_CLASS_ATTENDANCES = (classId: string) => `${TEACHER_PANEL_CLASSES}/${classId}/attendance`
const TEACHER_PANEL_CLASS_ATTENDANCE_INFO = (classId: string, attendanceId: string) => `${TEACHER_PANEL_CLASS_ATTENDANCES(classId)}/${attendanceId}`

const ADMIN_USER_DETAIL = (userId: string) => `${ADMIN_USERS}/${userId}`
const ADMIN_USERS = '/admin/users'
const ADMIN_CLASSES = '/admin/classes'

const APIES = {
  //admin
  ADMIN_USERS,
  ADMIN_ASSIGN_MISSING_STUDENT_ROLE: `${ADMIN_USERS}/assign-missing-student-role`,
  ADMIN_ADD_USER: `${ADMIN_USERS}/add`,
  ADMIN_USER_DETAIL,
  ADMIN_EDIT_USER: (userId: string) => `${ADMIN_USER_DETAIL(userId)}/edit`,
  ADMIN_DELETE_USER: (userId: string) => `${ADMIN_USER_DETAIL(userId)}/delete`,

  ADMIN_CLASSES,
  ADMIN_ADD_CLASS: `${ADMIN_CLASSES}/add`,
  ADMIN_EDIT_CLASS: (classId: string) => `${ADMIN_CLASSES}/${classId}/edit`,
  ADMIN_DELETE_CLASS: (classId: string) => `${ADMIN_CLASSES}/${classId}/delete`,

  ADMIN_REPORT: '/admin/report',

  ADMIN_CITIES: '/admin/cities',

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
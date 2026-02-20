
const AUTH_URL = '/auth'

const TEACHER_PANEL = '/teacher-panel'
const TEACHER_PANEL_CLASSES = `${TEACHER_PANEL}/classes`
const TEACHER_PANEL_CLASSES_ATTENDANCES = (classId: string) => `${TEACHER_PANEL_CLASSES}/${classId}/attendances`

const STUDENT_PANEL = '/student-panel'

const ADMIN_PANEL = '/admin-panel'

const CALL_API_ADMIN_USERS = '/call-api/admin/users'
const CALL_API_ADMIN_CLASSES = '/call-api/admin/classes'

const ROUTER_LINKS = {
  //auth routes
  LOGIN: `${AUTH_URL}/login`,
  SELECT_PANEL: `${AUTH_URL}/select-panel`,

  //teacher panel routes
  TEACHER_PANEL,
  TEACHER_PANEL_CLASSES,
  TEACHER_PANEL_CLASSES_ATTENDANCES,
  TEACHER_PANEL_CLASSES_ATTENDANCES_ADD: (classId: string) => `${TEACHER_PANEL_CLASSES_ATTENDANCES(classId)}/add`,
  TEACHER_PANEL_CLASSES_ATTENDANCE_DETAIL: (classId: string, attendanceId: string) => `${TEACHER_PANEL_CLASSES_ATTENDANCES(classId)}/${attendanceId}`,

  //student panel routes
  STUDENT_PANEL,

  //admin panel routes
  ADMIN_PANEL,

  //call api routes
  CALL_API_ADMIN_EDIT_USER: (userId: string | number) => `${CALL_API_ADMIN_USERS}/${userId}/edit`,
  CALL_API_ADMIN_EDIT_CLASS: (classId: string | number) => `${CALL_API_ADMIN_CLASSES}/${classId}/edit`,
} as const

export default ROUTER_LINKS;
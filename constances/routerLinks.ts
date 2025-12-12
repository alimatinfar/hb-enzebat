
const AUTH_URL = '/auth'
const TEACHER_PANEL_URL = '/teacher-panel'
const TEACHER_PANEL_CLASSES = `${TEACHER_PANEL_URL}/classes`
const TEACHER_PANEL_CLASSES_ATTENDANCES = (classId: string) => `${TEACHER_PANEL_CLASSES}/${classId}/attendances`

const ROUTER_LINKS = {
  //auth routes
  LOGIN: `${AUTH_URL}/login`,

  //teacher panel routes
  TEACHER_PANEL_CLASSES,
  TEACHER_PANEL_CLASSES_ATTENDANCES,
  TEACHER_PANEL_CLASSES_ATTENDANCES_ADD: (classId: string) => `${TEACHER_PANEL_CLASSES_ATTENDANCES(classId)}/add`,
} as const

export default ROUTER_LINKS;
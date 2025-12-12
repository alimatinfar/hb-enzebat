const TEACHER_PANEL_CLASSES = '/teacher/classes'
const TEACHER_PANEL_CLASS_ATTENDANCES = (classId: string) => `${TEACHER_PANEL_CLASSES}/${classId}/attendance`

const APIES = {
  //authentication
  LOGIN: '/auth/login',

  //teacher panel
  TEACHER_PANEL_CLASSES: '/teacher/classes',
  TEACHER_PANEL_CLASS_STUDENTS: (classId: string) => `${TEACHER_PANEL_CLASSES}/${classId}/students`,
  TEACHER_PANEL_CLASS_ATTENDANCES: (classId: string) => TEACHER_PANEL_CLASS_ATTENDANCES(classId),
  TEACHER_PANEL_CLASS_ATTENDANCES_ADD: (classId: string) => `${TEACHER_PANEL_CLASS_ATTENDANCES(classId)}/add`,
}

export default APIES
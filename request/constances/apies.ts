const RESERVATION_BASE_URL = 'reservation'

const APIES = {
  //authentication
  LOGIN: '/auth/login',

  //teacher panel
  TEACHER_PANEL_CLASSES: '/teacher/classes',
  TEACHER_PANEL_CLASS_ATTENDANCES: (classId: string) => `/teacher/classes/${classId}/attendance`,
}

export default APIES
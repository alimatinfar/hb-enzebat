export type ClassResponseType = {
  id: number,
  name: string,
  cityId: number | null,
  teacher: {
    id: number,
    firstName: string,
    lastName: string,
    mobile: string
  },
  city: {
    id: number,
    name: string
  } | null,
  _count: {
    students: number,
    attendance: number
  }
}
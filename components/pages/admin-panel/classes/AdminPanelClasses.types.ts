export type AdminClassResponseType = {
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
  },
  _count: {
    students: number,
    attendance: number
  }
}

export type AdminCityResponseType = {
  id: number;
  name: string;
}
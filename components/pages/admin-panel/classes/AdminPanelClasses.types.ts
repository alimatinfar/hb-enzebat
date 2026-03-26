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

export type AdminClassDetailResponseType = {
  id: number;
  name: string;
  teacherId: number;
  cityId: number;
  city: {
    id: number;
    name: string;
  };
  students: {
    id: number;
    firstName: string;
    lastName: string;
  }[];
  teacher: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

export type AdminClassDetailResponseStructureType = {class: AdminClassDetailResponseType}
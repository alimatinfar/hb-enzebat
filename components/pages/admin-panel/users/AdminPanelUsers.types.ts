export type UserResponseType = {
  id: number;
  mobile: string;
  password: string;
  firstName: string;
  lastName: string;
  cityId: number;
  roles: [
    {
      id: number;
      role: string;
      userId: 1;
    }
  ];
  city: {
    id: number;
    name: string;
  };
  _count: {
    teacherClasses: number;
    studentClasses: number;
  };
}
import {
  classNameFieldName,
  ClassNameFieldType
} from "@/components/pages/admin-panel/classes/Form/FormFields/ClassNameField/ClassNameField.constances";
import {
  selectCityFieldName, SelectCityFieldType
} from "@/components/pages/admin-panel/classes/Form/FormFields/SelectCityField/SelectCityField.constances";
import {
  selectTeacherFieldName, SelectTeacherFieldType
} from "@/components/pages/admin-panel/classes/Form/FormFields/SelectTeacherField/SelectTeacherField.constances";
import {
  selectStudentsFieldName, SelectStudentsFieldType
} from "@/components/pages/admin-panel/classes/Form/FormFields/SelectStudentsField/SelectStudentsField.constances";

export type AdminClassFormType = {
  [classNameFieldName]: ClassNameFieldType;
  [selectCityFieldName]: SelectCityFieldType;
  [selectTeacherFieldName]: SelectTeacherFieldType;
  [selectStudentsFieldName]: SelectStudentsFieldType;
}

export type AdminClassFormBodyData = {
  name: string;
  teacherId: number;
  cityId?: number;
  studentIds?: number[];
}
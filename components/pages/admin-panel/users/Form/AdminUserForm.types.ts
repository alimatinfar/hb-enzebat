import {
  selectCityFieldName, SelectCityFieldType
} from "@/components/pages/admin-panel/classes/Form/FormFields/SelectCityField/SelectCityField.constances";
import {
  firstNameFieldName, FirstNameFieldType
} from "@/components/pages/admin-panel/users/Form/FormFields/FirstNameField/FirstNameField.constances";
import {
  lastNameFieldName, LastNameFieldType
} from "@/components/pages/admin-panel/users/Form/FormFields/LastNameField/LastNameField.constances";
import {
  selectRolesFieldName, SelectRolesFieldType
} from "@/components/pages/admin-panel/users/Form/FormFields/SelectRolesField/SelectRolesField.constances";
import {mobileFieldName, MobileFieldType} from "@/components/pages/auth/FormFields/MobileField";
import {passwordFieldName, PasswordFieldType} from "@/components/pages/auth/FormFields/PasswordField";

export type AdminUserFormType = {
  [firstNameFieldName]: FirstNameFieldType;
  [lastNameFieldName]: LastNameFieldType;
  [selectCityFieldName]: SelectCityFieldType;
  [selectRolesFieldName]: SelectRolesFieldType;
  [mobileFieldName]: MobileFieldType;
  [passwordFieldName]: PasswordFieldType;
}

export type AdminUserFormBodyDataType = {
  mobile: string;
  password: string;
  firstName?: string;
  lastName?: string;
  roles: string[];
  cityId?: number;
}
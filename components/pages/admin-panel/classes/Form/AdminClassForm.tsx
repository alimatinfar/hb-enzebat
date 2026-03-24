'use client'

import ReactHookFormWrapper from "@/components/Form/FormLayout/ReactHookFormWrapper/ReactHookFormWrapper";
import useReactHookFormWrapper from "@/components/Form/FormLayout/ReactHookFormWrapper/hooks/useReactHookFormWrapper";
import ClassNameField from "@/components/pages/admin-panel/classes/Form/FormFields/ClassNameField/ClassNameField";
import BottomFixedButton from "@/components/Form/Button/inherited/BottomFixedButton";
import SelectTeacherField
  from "@/components/pages/admin-panel/classes/Form/FormFields/SelectTeacherField/SelectTeacherField";
import SelectCityField from "@/components/pages/admin-panel/classes/Form/FormFields/SelectCityField/SelectCityField";
import SelectStudentsField
  from "@/components/pages/admin-panel/classes/Form/FormFields/SelectStudentsField/SelectStudentsField";
import useFetchData from "@/request/hooks/useFetchData";
import APIES from "@/request/constances/apies";
import {
  AdminUserResponseStructureType
} from "@/components/pages/admin-panel/users/AdminPanelUsers.types";
import {useWatch} from "react-hook-form";
import {
  selectCityFieldName
} from "@/components/pages/admin-panel/classes/Form/FormFields/SelectCityField/SelectCityField.constances";
import getUrlWithParams from "@/utils/getUrlWithParams";
import {SelectOptionType} from "@/components/Form/Select/select-exports";

function AdminClassForm() {

  const onSubmitHandler = function () {

  }

  const {
    formMethods, onSubmit
  } = useReactHookFormWrapper({
    onSubmitHandler
  })

  //get students base city

  const cityValue = useWatch({name: selectCityFieldName, control: formMethods.control}) as (undefined | SelectOptionType)

  const {
    data, isFetching: getUsersLoading, error
  } = useFetchData<AdminUserResponseStructureType>({
    axiosConfig: {
      url: getUrlWithParams(APIES.ADMIN_USERS, {cityId: cityValue?.id})
    },
    options: {
      enabled: !!cityValue
    }
  })

  console.log({data})

  return (
    <ReactHookFormWrapper
      formMethods={formMethods} onSubmit={onSubmit}
    >
      <ClassNameField />

      <SelectCityField />

      <SelectTeacherField loading={getUsersLoading} />

      <SelectStudentsField loading={getUsersLoading} />

      <BottomFixedButton type='submit'>
        افزودن
      </BottomFixedButton>
    </ReactHookFormWrapper>
  );
}

export default AdminClassForm;
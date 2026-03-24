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

function AdminClassForm() {

  const onSubmitHandler = function () {

  }

  const {
    formMethods, onSubmit
  } = useReactHookFormWrapper({
    onSubmitHandler
  })

  return (
    <ReactHookFormWrapper
      formMethods={formMethods} onSubmit={onSubmit}
    >
      <ClassNameField />

      <SelectCityField />

      <SelectTeacherField />

      <SelectStudentsField />

      <BottomFixedButton type='submit'>
        افزودن
      </BottomFixedButton>
    </ReactHookFormWrapper>
  );
}

export default AdminClassForm;
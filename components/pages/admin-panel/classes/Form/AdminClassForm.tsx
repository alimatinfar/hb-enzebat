'use client'

import ReactHookFormWrapper from "@/components/Form/FormLayout/ReactHookFormWrapper/ReactHookFormWrapper";
import ClassNameField from "@/components/pages/admin-panel/classes/Form/FormFields/ClassNameField/ClassNameField";
import BottomFixedButton from "@/components/Form/Button/inherited/BottomFixedButton";
import SelectTeacherField
  from "@/components/pages/admin-panel/classes/Form/FormFields/SelectTeacherField/SelectTeacherField";
import SelectCityField from "@/components/pages/admin-panel/classes/Form/FormFields/SelectCityField/SelectCityField";
import SelectStudentsField
  from "@/components/pages/admin-panel/classes/Form/FormFields/SelectStudentsField/SelectStudentsField";
import useAdminClassForm from "@/components/pages/admin-panel/classes/Form/hooks/useAdminClassForm";

function AdminClassForm() {

  const {
    formMethods, onSubmit, usersLoading, teachers, students, formLoading
  } = useAdminClassForm()

  return (
    <ReactHookFormWrapper
      formMethods={formMethods} onSubmit={onSubmit}
    >
      <ClassNameField/>

      <SelectCityField/>

      <SelectTeacherField loading={usersLoading} options={teachers}/>

      <SelectStudentsField loading={usersLoading} options={students}/>

      <BottomFixedButton type='submit' loading={formLoading}>
        افزودن
      </BottomFixedButton>
    </ReactHookFormWrapper>
  );
}

export default AdminClassForm;
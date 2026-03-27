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
import PageTitle from "@/components/others/PageTitle/PageTitle";
import AdminLayout from "@/components/layouts/AdminLayout";
import RenderLogic from "@/components/others/RenderLogic/RenderLogic";

function AdminClassForm() {

  const {
    formMethods, onSubmit, usersLoading, teachers, students, formLoading,
    classNameValue, detailInfoLoading, isEditMode
  } = useAdminClassForm()

  return (
    <AdminLayout hasBack>
      <RenderLogic isLoading={detailInfoLoading}>
        <PageTitle>
          {isEditMode ? `ویرایش کلاس ${classNameValue}` : 'افزودن کلاس جدید'}
        </PageTitle>

        <ReactHookFormWrapper
          formMethods={formMethods} onSubmit={onSubmit}
        >
          <ClassNameField/>

          <SelectCityField/>

          <SelectTeacherField loading={usersLoading} options={teachers}/>

          <SelectStudentsField loading={usersLoading} options={students}/>

          <BottomFixedButton type='submit' loading={formLoading}>
            {isEditMode ? 'ویرایش' : 'افزودن'}
          </BottomFixedButton>
        </ReactHookFormWrapper>
      </RenderLogic>
    </AdminLayout>
  );
}

export default AdminClassForm;
'use client'

import SelectCityField from "@/components/pages/admin-panel/classes/Form/FormFields/SelectCityField/SelectCityField";
import BottomFixedButton from "@/components/Form/Button/inherited/BottomFixedButton";
import ReactHookFormWrapper from "@/components/Form/FormLayout/ReactHookFormWrapper/ReactHookFormWrapper";
import FirstNameField from "@/components/pages/admin-panel/users/Form/FormFields/FirstNameField/FirstNameField";
import LastNameField from "@/components/pages/admin-panel/users/Form/FormFields/LastNameField/LastNameField";
import MobileField from "@/components/pages/auth/FormFields/MobileField";
import PasswordField from "@/components/pages/auth/FormFields/PasswordField";
import SelectRolesField from "@/components/pages/admin-panel/users/Form/FormFields/SelectRolesField/SelectRolesField";
import useAdminUserForm from "@/components/pages/admin-panel/users/Form/hooks/useAdminUserForm";
import PageTitle from "@/components/others/PageTitle/PageTitle";
import AdminLayout from "@/components/layouts/AdminLayout";
import RenderLogic from "@/components/others/RenderLogic/RenderLogic";


function AdminUserForm() {

  const {
    formMethods, onSubmit, formLoading, fullName, detailInfoLoading, isEditMode
  } = useAdminUserForm()

  return (
    <AdminLayout hasBack>
      <RenderLogic isLoading={detailInfoLoading}>
        <PageTitle>
          {isEditMode ? `ویرایش اطلاعات ${fullName}` : 'افزودن کاربر جدید'}
        </PageTitle>

        <ReactHookFormWrapper
          formMethods={formMethods} onSubmit={onSubmit}
        >
          <FirstNameField/>

          <LastNameField/>

          <SelectCityField/>

          <SelectRolesField/>

          <MobileField hasValidation/>

          <PasswordField/>

          <BottomFixedButton type='submit' loading={formLoading}>
            {isEditMode ? 'ویرایش' : 'افزودن'}
          </BottomFixedButton>
        </ReactHookFormWrapper>
      </RenderLogic>
    </AdminLayout>
  );
}

export default AdminUserForm;
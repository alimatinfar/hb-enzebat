import PageTitle from "@/components/others/PageTitle/PageTitle";
import AdminLayout from "@/components/layouts/AdminLayout";
import AdminUserForm from "@/components/pages/admin-panel/users/Form/AdminUserForm";


function AdminUserAddPage() {



  return (
    <AdminLayout hasBack>
      <PageTitle>
        افزودن کاربر جدید
      </PageTitle>

      <AdminUserForm/>
    </AdminLayout>
  );
}

export default AdminUserAddPage;
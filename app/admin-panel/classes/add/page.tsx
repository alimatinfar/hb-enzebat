import PageTitle from "@/components/others/PageTitle/PageTitle";
import AdminLayout from "@/components/layouts/AdminLayout";
import AdminClassForm from "@/components/pages/admin-panel/classes/Form/AdminClassForm";

function AdminClassAddPage() {
  return (
    <AdminLayout hasBack>
      <PageTitle>
        افزودن کلاس جدید
      </PageTitle>

      <AdminClassForm />
    </AdminLayout>
  );
}

export default AdminClassAddPage;
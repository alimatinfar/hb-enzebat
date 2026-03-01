'use client'

import hasRole from "@/utils/authentication/hasRole";
import AdminLayout from "@/components/layouts/AdminLayout";


function AdminPanelPage() {

  console.log({hasAdminRole: hasRole('ADMIN')})

  return (
    <AdminLayout>
      admin panel page
    </AdminLayout>
  );
}

export default AdminPanelPage;
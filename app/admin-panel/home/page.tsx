'use client'

import hasRole from "@/utils/authentication/hasRole";
import AdminLayout from "@/components/layouts/AdminLayout";
import AdminHomeReport from "@/components/pages/admin-panel/home/AdminHomeReport";


function AdminPanelPage() {

  console.log({hasAdminRole: hasRole('ADMIN')})

  return (
    <AdminLayout>
      <AdminHomeReport />
    </AdminLayout>
  );
}

export default AdminPanelPage;
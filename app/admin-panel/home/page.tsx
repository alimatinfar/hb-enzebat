'use client'

import AdminLayout from "@/components/layouts/AdminLayout";
import AdminHomeReport from "@/components/pages/admin-panel/home/AdminHomeReport";
import AdminHomeUsers from "@/components/pages/admin-panel/home/AdminHomeUsers";
import AdminHomeClasses from "@/components/pages/admin-panel/home/AdminHomeClasses";


function AdminPanelPage() {
  return (
    <AdminLayout>
      <div className='flex flex-col gap-y-4'>
        <AdminHomeReport />

        <AdminHomeUsers />

        <AdminHomeClasses />
      </div>
    </AdminLayout>
  );
}

export default AdminPanelPage;
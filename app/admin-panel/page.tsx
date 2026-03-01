'use client'

import hasRole from "@/utils/authentication/hasRole";


function AdminPanelPage() {

  console.log({hasAdminRole: hasRole('ADMIN')})

  return (
    <div>
      admin panel page
    </div>
  );
}

export default AdminPanelPage;
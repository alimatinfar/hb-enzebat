'use client'

import AdminLayout from "@/components/layouts/AdminLayout";
import PageTitle from "@/components/others/PageTitle/PageTitle";
import ReportCard from "@/components/others/Card/ReportCard";
import Button from "@/components/Form/Button/Button";
import EditIcon from "@/components/svg/EditIcon";
import Link from "next/link";
import ROUTER_LINKS from "@/constances/routerLinks";
import useAdminUserDetailPage from "@/components/pages/admin-panel/users/detail/hooks/useAdminUserDetailPage";


function AdminUserDetailPage() {

  const {
    teacherReportKeyValues, studentReportKeyValues, infoKeyValues, userId, userIsStudent, userIsTeacher
  } = useAdminUserDetailPage()

  return (
    <AdminLayout hasBack>
      <PageTitle>
        اطلاعات علی متین فر
      </PageTitle>

      <div className='flex flex-col gap-y-4'>
        {userIsTeacher && (
          <ReportCard title='گزارش عملکرد معلم' keyValues={teacherReportKeyValues}/>
        )}

        {userIsStudent && (
          <ReportCard title='گزارش عملکرد دانش‌آموز' keyValues={studentReportKeyValues}/>
        )}

        <ReportCard title='اطلاعات' keyValues={infoKeyValues}>
          <Link href={ROUTER_LINKS.ADMIN_PANEL_USER_EDIT(String(userId))}>
            <Button size='sm' rightIcon={<EditIcon textColor='text-white' />}>
              ویرایش اطلاعات
            </Button>
          </Link>
        </ReportCard>
      </div>
    </AdminLayout>
  );
}

export default AdminUserDetailPage;
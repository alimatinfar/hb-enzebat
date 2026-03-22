'use client'

import AdminLayout from "@/components/layouts/AdminLayout";
import PageTitle from "@/components/others/PageTitle/PageTitle";
import ReportCard from "@/components/others/Card/ReportCard";
import ROUTER_LINKS from "@/constances/routerLinks";
import Button from "@/components/Form/Button/Button";
import EditIcon from "@/components/svg/EditIcon";
import Link from "next/link";
import AdminClassDetailStudents from "@/components/pages/admin-panel/classes/detail/AdminClassDetailStudents";
import useAdminClassDetailPage from "@/components/pages/admin-panel/classes/detail/hooks/useAdminClassDetailPage";

function AdminClassDetailPage() {

  const {
    infoKeyValues, classId, teacherKeyValues, students
  } = useAdminClassDetailPage()

  return (
    <AdminLayout hasBack>
      <PageTitle>
        جزئیات کلاس الطریق النجاه
      </PageTitle>

      <div className='flex flex-col gap-y-4'>
        <ReportCard title='اطلاعات کلاس' keyValues={infoKeyValues}>
          <Link href={ROUTER_LINKS.ADMIN_PANEL_CLASS_EDIT(String(classId))}>
            <Button size='sm' rightIcon={<EditIcon textColor='text-white'/>}>
              ویرایش اطلاعات
            </Button>
          </Link>
        </ReportCard>

        <ReportCard title='اطلاعات معلم' keyValues={teacherKeyValues}>
          {/*TODO set teacher id*/}
          <Link href={ROUTER_LINKS.ADMIN_PANEL_USER_DETAIL(String(1))}>
            <Button size='sm' rightIcon={<EditIcon textColor='text-white'/>}>
              جزئیات
            </Button>
          </Link>
        </ReportCard>

        <AdminClassDetailStudents students={students} />
      </div>
    </AdminLayout>
  );
}

export default AdminClassDetailPage;
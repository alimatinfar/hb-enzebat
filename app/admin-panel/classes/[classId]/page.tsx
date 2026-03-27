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
import DeleteButtonWithConfirm from "@/components/Form/Button/inherited/DeleteButtonWithConfirm";
import RenderLogic from "@/components/others/RenderLogic/RenderLogic";

function AdminClassDetailPage() {

  const {
    infoKeyValues, classId, teacherKeyValues, students,
    deleteLoading, onDeleteHandler, classTitle, infoLoading, teacherId
  } = useAdminClassDetailPage()

  return (
    <AdminLayout hasBack>
      <RenderLogic isLoading={infoLoading}>
        <PageTitle endAdornment={(
          <div>
            <DeleteButtonWithConfirm
              modalProps={{
                title: 'حذف کلاس',
                loading: deleteLoading,
                onConfirmHandler: onDeleteHandler,
                description: `آیا از حذف کلاس ${classTitle} مطمئن هستید؟`,
              }}
            >
              حذف کلاس
            </DeleteButtonWithConfirm>
          </div>
        )}>
          جزئیات کلاس {classTitle}
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
            <Link href={ROUTER_LINKS.ADMIN_PANEL_USER_DETAIL(String(teacherId))}>
              <Button variant='outlined' size='sm'>
                جزئیات
              </Button>
            </Link>
          </ReportCard>

          <AdminClassDetailStudents students={students}/>
        </div>
      </RenderLogic>
    </AdminLayout>
  );
}

export default AdminClassDetailPage;
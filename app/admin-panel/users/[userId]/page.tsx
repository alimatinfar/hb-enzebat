'use client'

import AdminLayout from "@/components/layouts/AdminLayout";
import PageTitle from "@/components/others/PageTitle/PageTitle";
import ReportCard from "@/components/others/Card/ReportCard";
import Button from "@/components/Form/Button/Button";
import EditIcon from "@/components/svg/EditIcon";
import Link from "next/link";
import ROUTER_LINKS from "@/constances/routerLinks";
import useAdminUserDetailPage from "@/components/pages/admin-panel/users/detail/hooks/useAdminUserDetailPage";
import AdminUserDetailClasses from "@/components/pages/admin-panel/users/detail/AdminUserDetailClasses";
import DeleteButtonWithConfirm from "@/components/Form/Button/inherited/DeleteButtonWithConfirm";
import RenderLogic from "@/components/others/RenderLogic/RenderLogic";


function AdminUserDetailPage() {

  const {
    teacherReportKeyValues, studentReportKeyValues, infoKeyValues, userId, userIsStudent, userIsTeacher,
    teacherClasses, studentClasses, infoLoading,
    deleteLoading, onDeleteHandler, userTitle
  } = useAdminUserDetailPage()

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
                description: `آیا از حذف کاربر ${userTitle} مطمئن هستید؟`,
              }}
            >
              حذف کاربر
            </DeleteButtonWithConfirm>
          </div>
        )}>
          اطلاعات {userTitle}
        </PageTitle>

        <div className='flex flex-col gap-y-4'>
          <ReportCard title='اطلاعات' keyValues={infoKeyValues}>
            <Link href={ROUTER_LINKS.ADMIN_PANEL_USER_EDIT(String(userId))}>
              <Button size='sm' rightIcon={<EditIcon textColor='text-white'/>}>
                ویرایش اطلاعات
              </Button>
            </Link>
          </ReportCard>

          {userIsTeacher && (
            <ReportCard title='گزارش عملکرد معلم' keyValues={teacherReportKeyValues}/>
          )}

          {userIsStudent && (
            <ReportCard title='گزارش عملکرد دانش‌آموز' keyValues={studentReportKeyValues}/>
          )}

          {userIsTeacher && (
            <AdminUserDetailClasses
              title='کلاس‌های معلم' classes={teacherClasses}
            />
          )}

          {userIsStudent && (
            <AdminUserDetailClasses
              title='کلاس‌های دانش‌آموز' classes={studentClasses}
            />
          )}
        </div>
      </RenderLogic>
    </AdminLayout>
  );
}

export default AdminUserDetailPage;
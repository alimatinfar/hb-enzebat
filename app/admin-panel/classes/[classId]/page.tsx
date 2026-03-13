'use client'

import AdminLayout from "@/components/layouts/AdminLayout";
import PageTitle from "@/components/others/PageTitle/PageTitle";
import ReportCard from "@/components/others/Card/ReportCard";
import {KeyValueProps} from "@/components/others/KeyValue/KeyValue";
import {useMemo} from "react";
import ROUTER_LINKS from "@/constances/routerLinks";
import Button from "@/components/Form/Button/Button";
import EditIcon from "@/components/svg/EditIcon";
import Link from "next/link";
import {useParams} from "next/navigation";
import AdminClassDetailStudents from "@/components/pages/admin-panel/classes/detail/AdminClassDetailStudents";
import {AdminUserCardProps} from "@/components/pages/admin-panel/users/AdminUserCard";

function AdminClassDetailPage() {

  const {classId} = useParams()

  const infoKeyValues: KeyValueProps[] = useMemo(function () {
    return [
      {title: 'شناسه', value: 1},
      {title: 'نام کلاس', value: 'الطریق النجاه'},
      {title: 'تعداد دانش آموزان', value: 10},
      {title: 'تعداد جلسات تشکیل شده', value: 20},
      {title: 'میانگین درصد حضور دانش آموزان', value: `${50}%`},
    ]
  }, [])

  const teacherKeyValues: KeyValueProps[] = useMemo(function () {
    return [
      {title: 'شناسه', value: 1},
      {title: 'نام و نام خانوادگی', value: 'حاج محمود شفیعیان'},
      {title: 'موبایل', value: '09199999999'},
    ]
  }, [])

  const students: AdminUserCardProps[] = useMemo(function () {
    return [
      {
        id: 1, roles: [], firstName: 'علی', lastName: 'متین فر', cityName: 'تهران'
      },
      {
        id: 2, roles: [], firstName: 'علی', lastName: 'متین فر', cityName: 'تهران'
      },
      {
        id: 3, roles: [], firstName: 'علی', lastName: 'متین فر', cityName: 'تهران'
      },
      {
        id: 4, roles: [], firstName: 'علی', lastName: 'متین فر', cityName: 'تهران'
      },
      {
        id: 5, roles: [], firstName: 'علی', lastName: 'متین فر', cityName: 'تهران'
      },
    ]
  }, [])

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
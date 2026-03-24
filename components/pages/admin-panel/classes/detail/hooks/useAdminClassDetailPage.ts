import {useParams} from "next/navigation";
import {KeyValueProps} from "@/components/others/KeyValue/KeyValue";
import {useMemo} from "react";
import {AdminUserCardProps} from "@/components/pages/admin-panel/users/AdminUserCard";
import useAdminClassDetailPageDelete
  from "@/components/pages/admin-panel/classes/detail/hooks/useAdminClassDetailPageDelete";

function useAdminClassDetailPage() {

  const {classId} = useParams()

  //TODO should implemented api for user detail

  const infoKeyValues: KeyValueProps[] = useMemo(function () {
    return [
      {title: 'شناسه', value: 1},
      {title: 'شهر', value: 'تهران'},
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

  const {
    deleteLoading, onDeleteHandler
  } = useAdminClassDetailPageDelete()

  const classTitle = 'طریق النجاه'

  return {
    infoKeyValues, classId, teacherKeyValues, students,
    deleteLoading, onDeleteHandler, classTitle
  }
}

export default useAdminClassDetailPage;
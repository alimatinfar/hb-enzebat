import {useParams} from "next/navigation";
import {KeyValueProps} from "@/components/others/KeyValue/KeyValue";
import {useMemo} from "react";
import {AdminUserCardProps} from "@/components/pages/admin-panel/users/AdminUserCard";
import useAdminClassDetailPageDelete
  from "@/components/pages/admin-panel/classes/detail/hooks/useAdminClassDetailPageDelete";
import useFetchData from "@/request/hooks/useFetchData";
import {AdminClassDetailResponseStructureType} from "@/components/pages/admin-panel/classes/AdminPanelClasses.types";
import APIES from "@/request/constances/apies";
import getUrlWithParams from "@/utils/getUrlWithParams";

function useAdminClassDetailPage() {

  const {classId} = useParams()

  const {
    data, isFetching: infoLoading
  } = useFetchData<AdminClassDetailResponseStructureType>({
    axiosConfig: {
      url: getUrlWithParams(APIES.ADMIN_CLASS_DETAIL(String(classId)), {moreInfo: true}),
    }
  })

  const classInfo = data?.class
  const moreInfo = data?.moreInfo

  const classTitle = useMemo(function () {
    return classInfo ? classInfo?.name : ''
  }, [classInfo])

  const teacherId = useMemo(function () {
    return classInfo ? classInfo?.teacherId : ''
  }, [])

  const infoKeyValues: KeyValueProps[] = useMemo(function () {
    if (!classInfo) return []

    return [
      {title: 'شناسه', value: classInfo?.id},
      {title: 'شهر', value: classInfo?.city?.name},
      {title: 'نام کلاس', value: classInfo?.name},
      {title: 'تعداد دانش آموزان', value: classInfo?.students?.length},
      {title: 'تعداد جلسات تشکیل شده', value: moreInfo?.totalSessions},
      {title: 'میانگین درصد حضور دانش آموزان', value: `${moreInfo?.averageAttendancePercent}%`},
    ]
  }, [classInfo, moreInfo])

  const teacherKeyValues: KeyValueProps[] = useMemo(function () {
    if (!classInfo) return []

    const teacher = classInfo?.teacher

    return [
      {title: 'شناسه', value: teacher?.id},
      {title: 'نام و نام خانوادگی', value: `${teacher?.firstName} ${teacher?.lastName}`},
      {title: 'موبایل', value: teacher?.mobile},
    ]
  }, [classInfo])

  const students: AdminUserCardProps[] = useMemo(function () {
    if (!classInfo) return []

    return classInfo?.students?.map(student => ({
      id: student?.id,
      roles: student.roles,
      firstName: student?.firstName,
      lastName: student?.lastName,
      cityName: student?.city?.name,
    }))
  }, [classInfo])

  const {
    deleteLoading, onDeleteHandler
  } = useAdminClassDetailPageDelete()

  return {
    infoKeyValues, classId, teacherKeyValues, students,
    deleteLoading, onDeleteHandler, classTitle, infoLoading, teacherId
  }
}

export default useAdminClassDetailPage;
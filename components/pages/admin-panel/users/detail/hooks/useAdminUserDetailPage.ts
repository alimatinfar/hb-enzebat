import {useParams} from "next/navigation";
import {KeyValueProps} from "@/components/others/KeyValue/KeyValue";
import {useCallback, useMemo} from "react";
import {USER_ROLE_LABELS} from "@/components/pages/admin-panel/users/AdminPanelUsers.constances";
import {AdminClassCardProps} from "@/components/pages/admin-panel/classes/AdminClassCard";
import useAdminUserDetailPageDelete
  from "@/components/pages/admin-panel/users/detail/hooks/useAdminUserDetailPageDelete";
import useFetchData from "@/request/hooks/useFetchData";
import {AdminUserDetailResponseStructureType} from "@/components/pages/admin-panel/users/AdminPanelUsers.types";
import APIES from "@/request/constances/apies";
import {Role} from "@/app/generated/prisma/enums";
import getUrlWithParams from "@/utils/getUrlWithParams";

function useAdminUserDetailPage() {

  const {userId} = useParams()

  const {
    data: infoData, isFetching: infoLoading
  } = useFetchData<AdminUserDetailResponseStructureType>({
    axiosConfig: {
      url: getUrlWithParams(APIES.ADMIN_USER_DETAIL(String(userId)), {moreInfo: true})
    },
  })

  const userInfoData = infoData?.user
  const userTitle = `${userInfoData?.firstName} ${userInfoData?.lastName}`

  const hasSpecificRole = useCallback(function (role: Role) {
    if (!userInfoData) return
    return userInfoData?.roles?.map(role => role.role)?.includes(role)
  }, [userInfoData])

  const userIsTeacher = useMemo(function () {
    return hasSpecificRole(Role.TEACHER)
  }, [hasSpecificRole])

  const userIsStudent = useMemo(function () {
    return hasSpecificRole(Role.STUDENT)
  }, [hasSpecificRole])

  const infoKeyValues: KeyValueProps[] = useMemo(function () {
    if (!userInfoData) return []

    return [
      {title: 'شناسه', value: userInfoData?.id},
      {title: 'نام', value: userInfoData?.firstName},
      {title: 'نام خانوادگی', value: userInfoData?.lastName},
      {title: 'موبایل', value: userInfoData?.mobile},
      {title: 'شهر', value: userInfoData?.city?.name},
      {title: 'نقش ها', value: userInfoData?.roles?.map(role => USER_ROLE_LABELS[role?.role])?.join(', ')},
    ]
  }, [userInfoData])

  const teacherReportKeyValues: KeyValueProps[] = useMemo(function () {
    const teacherInfo = infoData?.teacher
    if (!userIsTeacher || !teacherInfo) return []


    return [
      {
        title: 'تعداد کل کلاس‌های معلم',
        value: teacherInfo?.classes?.length
      },
      {
        title: 'تعداد کل جلسات برگزار شده',
        value: teacherInfo?.totalSessions
      },
      {
        title: 'تعداد کل شاگردان',
        value: teacherInfo?.totalStudents
      },
    ]
  }, [userIsTeacher, infoData])

  const studentReportKeyValues: KeyValueProps[] = useMemo(function () {
    const studentInfo = infoData?.student
    if (!userIsStudent || !studentInfo) return []

    return [
      {
        title: 'تعداد کل کلاس‌های عضو شده',
        value: studentInfo?.classes?.length,
      },
      {
        title: 'تعداد حضور در جلسات',
        value: studentInfo?.totalAttendedSessions
      },
      {
        title: 'تعداد غیبت در جلسات',
        value: studentInfo?.totalAbsentSessions
      },
      {
        title: 'درصد حضور در جلسات',
        value: `${studentInfo?.averageAttendancePercent}%`
      },
      {
        title: 'درصد غیبت‌های موجه',
        value: `${studentInfo?.excusedAbsencePercent}%`
      },
    ]
  }, [userIsStudent, infoData])

  const teacherClasses: AdminClassCardProps[] = useMemo(function () {
    const teacherInfo = infoData?.teacher
    if (!userIsTeacher || !teacherInfo) return []

    return teacherInfo?.classes?.map(item => ({
      id: item?.id, name: item?.name, cityName: item?.city?.name
    }))
  }, [userIsTeacher, infoData])

  const studentClasses: AdminClassCardProps[] = useMemo(function () {
    const studentInfo = infoData?.student
    if (!userIsStudent || !studentInfo) return []

    return studentInfo?.classes?.map(item => ({
      id: item?.id, name: item?.name, cityName: item?.city?.name
    }))
  }, [userIsStudent, infoData])

  const {
    deleteLoading, onDeleteHandler
  } = useAdminUserDetailPageDelete()

  return {
    teacherReportKeyValues, studentReportKeyValues, infoKeyValues, userId, userIsStudent, userIsTeacher,
    teacherClasses, studentClasses, infoLoading,
    deleteLoading, onDeleteHandler, userTitle
  }
}

export default useAdminUserDetailPage;
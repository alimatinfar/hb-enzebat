import {useParams} from "next/navigation";
import {KeyValueProps} from "@/components/others/KeyValue/KeyValue";
import {useMemo} from "react";
import {USER_ROLE_LABELS} from "@/components/pages/admin-panel/users/AdminPanelUsers.constances";
import {AdminClassCardProps} from "@/components/pages/admin-panel/classes/AdminClassCard";

function useAdminUserDetailPage() {

  const {userId} = useParams()

  //TODO should implemented api for user detail

  const userIsTeacher = true

  const teacherReportKeyValues: KeyValueProps[] = useMemo(function () {
    if (!userIsTeacher) return []

    return [
      {
        title: 'تعداد کل کلاس‌های معلم',
        value: 0
      },
      {
        title: 'تعداد کل جلسات برگزار شده',
        value: 0
      },
      {
        title: 'تعداد کل شاگردان',
        value: 0
      },
    ]
  }, [userIsTeacher])

  const userIsStudent = true

  const studentReportKeyValues: KeyValueProps[] = useMemo(function () {
    if (!userIsStudent) return []

    return [
      {
        title: 'تعداد کل کلاس‌های عضو شده',
        value: 0
      },
      {
        title: 'تعداد کل جلسات شرکت کرده',
        value: 0
      },
      {
        title: 'درصد کل حضور در کلاس‌ها',
        value: `${50}%`
      },
      {
        title: 'درصد غیبت‌های موجه',
        value: `${50}%`
      },
    ]
  }, [userIsStudent])

  const infoKeyValues: KeyValueProps[] = useMemo(function () {
    if (!userIsStudent) return []

    return [
      {title: 'شناسه', value: ''},
      {title: 'نام', value: ''},
      {title: 'نام خانوادگی', value: ''},
      {title: 'موبایل', value: ''},
      {title: 'شهر', value: ''},
      {title: 'نقش ها', value: USER_ROLE_LABELS['ADMIN']},
    ]
  }, [userIsStudent])

  const teacherClasses: AdminClassCardProps[] = useMemo(function () {
    return [
      {id: 1, name: 'کلاس شماره 1', cityName: 'تهران'},
      {id: 2, name: 'کلاس شماره 2', cityName: 'تهران'},
      {id: 3, name: 'کلاس شماره 3', cityName: 'تهران'},
    ]
  }, [])

  const studentClasses: AdminClassCardProps[] = useMemo(function () {
    return [
      {id: 1, name: 'کلاس شماره 1', cityName: 'تهران'},
      {id: 2, name: 'کلاس شماره 2', cityName: 'تهران'},
      {id: 3, name: 'کلاس شماره 3', cityName: 'تهران'},
    ]
  }, [])

  return {
    teacherReportKeyValues, studentReportKeyValues, infoKeyValues, userId, userIsStudent, userIsTeacher,
    teacherClasses, studentClasses
  }
}

export default useAdminUserDetailPage;
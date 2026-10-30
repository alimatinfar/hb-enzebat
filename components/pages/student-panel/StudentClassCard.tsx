import Link from "next/link";
import Card from "@/components/others/Card/Card";
import Chips from "@/components/others/Chips/Chips";
import ArrowIcon from "@/components/svg/ArrowIcon";
import BookIcon from "@/components/svg/BookIcon";
import ROUTER_LINKS from "@/constances/routerLinks";
import {StudentClassType} from "@/components/pages/student-panel/StudentPanel.types";

type Props = {
  item: StudentClassType;
}

function StudentClassCard({item}: Props) {

  const teacherFullName = `${item.teacher?.firstName || ''} ${item.teacher?.lastName || ''}`.trim()

  return (
    <Link href={ROUTER_LINKS.STUDENT_PANEL_CLASS_DETAIL(item.id)} className='block'>
      <Card className='flex flex-col gap-y-2.5' isClickable>
        <div className='flex items-center justify-between space-x-2'>
          <div className='flex items-center space-x-1'>
            <BookIcon/>
            <span className='font-medium text-xl'>
              {item.name}
            </span>
          </div>

          <ArrowIcon className='rotate-90'/>
        </div>

        <div className='flex items-center justify-between space-x-2 text-sm text-gray-500'>
          <span>معلم: {teacherFullName || '—'}</span>

          <Chips
            text={item.isVirtual ? 'مجازی' : 'حضوری'}
            color={item.isVirtual ? 'warning' : 'success'}
          />
        </div>

        <div className='flex items-center justify-between text-xs text-gray-500'>
          <span>{item._count?.attendance ?? 0} جلسه</span>
          <span>{item._count?.students ?? 0} دانش آموز</span>
        </div>
      </Card>
    </Link>
  );
}

export default StudentClassCard;

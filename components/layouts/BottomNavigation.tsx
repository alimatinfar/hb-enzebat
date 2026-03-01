'use client'

import {LAYOUT_MAX_WIDTH} from "@/constances/layout/mainLayoutExports";
import Z_INDEXES from "@/constances/zIndexes";
import {IconFunctionType} from "@/types/IconPropsType";
import {usePathname} from "next/navigation";
import Link from "next/link";


export type BottomNavigationProps = {
  gridColsClass?: 'grid-cols-3' | 'grid-cols-2';
  links: {
    title: string;
    icon: IconFunctionType;
    link: string;
  }[];
}

function BottomNavigation(
  {gridColsClass = 'grid-cols-3', links}: BottomNavigationProps
) {

  const pathname = usePathname()

  return (
    <div className={`
        shadow-[0px_-2px_4px_-2px_rgba(16,24,40,0.06),0px_-4px_8px_-2px_rgba(16,24,40,0.1)]
        bg-white grid ${gridColsClass} fixed bottom-0 inset-x-0 rounded-t-lg
        ${Z_INDEXES.bottomNavigation} ${LAYOUT_MAX_WIDTH}
      `}>
      {links.map((item, index) => {

        const isActive = pathname.includes(item.link)

        return (
          <div
            key={index + item.link} className='flex-center'
          >
            <Link href={item.link} className={`
              flex flex-col space-y-1 items-center p-2.5 min-w-20 cursor-pointer  duration-200
              ${isActive ? 'text-primary' : 'text-gray-500 hover:bg-gray-100'} 
            `}>
              <item.icon textColor='text-inherit'/>

              <span className='text-sm text-inherit'>
                {item.title}
              </span>
            </Link>
          </div>
        )
      })}
    </div>
  );
}

export default BottomNavigation;
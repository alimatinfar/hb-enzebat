'use client'

import React, {useMemo} from 'react';
import useFetchData from "@/request/hooks/useFetchData";
import APIES from "@/request/constances/apies";
import RenderLogic from "@/components/others/RenderLogic/RenderLogic";
import {TeacherClassType} from "@/components/pages/teacher-panel/classes/TeacherPanelClassesExports";
import Card from "@/components/others/Card/Card";
import ArrowIcon from "@/components/svg/ArrowIcon";
import PanelLayout from "@/components/layouts/PanelLayout";
import PageTitle from "@/components/others/PageTitle/PageTitle";
import Link from "next/link";
import ROUTER_LINKS from "@/constances/routerLinks";

function TeacherPanelHomePage() {

  const {
    data, isFetching, error
  } = useFetchData({
    axiosConfig: {
      url: APIES.TEACHER_PANEL_CLASSES
    },
    disableThrowErrorToast: true
  })

  const classes: TeacherClassType[] = useMemo(() => data?.classes || [], [data])

  return (
    <PanelLayout hasBack>
      <PageTitle>
        دروس
      </PageTitle>

      <RenderLogic
        error={error} isLoading={isFetching}
      >
        <div className='space-y-4'>
          {classes.map((item, index) => (
            <Link key={item.id} href={`${ROUTER_LINKS.TEACHER_PANEL_CLASSES_ATTENDANCES(item.id)}`} className='block'>
              <Card key={index} className='flex items-center justify-between space-x-2' isClickable>
              <span className='font-medium text-xl'>
                {item?.name}
              </span>

                <ArrowIcon className='rotate-90' />
              </Card>
            </Link>
          ))}
        </div>
      </RenderLogic>
    </PanelLayout>
  );
}

export default TeacherPanelHomePage;
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
import getUrlWithParams from "@/utils/getUrlWithParams";
import QUERY_PARAMS from "@/constances/queryParams";

function TeacherPanelHomePage() {

  const {
    data, isFetching, error
  } = useFetchData<{ classes: TeacherClassType[] }>({
    axiosConfig: {
      url: APIES.TEACHER_PANEL_CLASSES
    },
    disableThrowErrorToast: true
  })

  const classes = useMemo(() => data?.classes || [], [data])

  return (
    <PanelLayout>
      <PageTitle>
        دروس
      </PageTitle>

      <RenderLogic
        error={error} isLoading={isFetching}
      >
        <div className='space-y-4'>
          {classes.map((item, index) => {
            const linkUrl = ROUTER_LINKS.TEACHER_PANEL_CLASSES_ATTENDANCES(String(item.id))
            const linkParams = {[QUERY_PARAMS.CLASS_NAME]: item.name}

            return (
              <Link
                key={item.id} className='block'
                href={getUrlWithParams(linkUrl, linkParams)}
              >
                <Card key={index} className='flex items-center justify-between space-x-2' isClickable>
                <span className='font-medium text-xl'>
                  {item?.name}
                </span>

                  <ArrowIcon className='rotate-90' />
                </Card>
              </Link>
            )
          })}
        </div>
      </RenderLogic>
    </PanelLayout>
  );
}

export default TeacherPanelHomePage;
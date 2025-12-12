'use client'

import React, {useCallback} from 'react';
import {LAYOUT_MAX_WIDTH, TOP_BAR_HEIGHT} from "@/constances/layout/mainLayoutExports";
import ArrowBack from "@/components/svg/ArrowBack";
import IconClickable from "@/components/others/Icon/IconClickable";
import LogoutIcon from "@/components/svg/LogoutIcon";
import useLogout from "@/request/hooks/useLogout";
import {useRouter} from "next/navigation";

export type TopBarProps = {
  hasBack?: boolean;
  hasLogout?: boolean;
}

function TopBar(
  {hasBack, hasLogout}: TopBarProps
) {

  const {logoutHandler} = useLogout()

  const router = useRouter()

  const onBackRoute = useCallback(function () {
    router.back()
  }, [router])

  return (
    <div
      style={{
        backgroundImage: `url(/login-top-background.png)`,
      }}
      className={`grid grid-cols-6 bg-primary ${TOP_BAR_HEIGHT} rounded-b-xl fixed top-0 ${LAYOUT_MAX_WIDTH} mx-auto w-full px-4`}>
      <div className='flex items-center'>
        {hasBack && (
          <IconClickable primaryMode onClick={onBackRoute}>
            <ArrowBack textColor='text-white' />
          </IconClickable>
        )}
      </div>

      <p className='text-white text-3xl font-black col-span-4 flex-center'>
        انضباط
      </p>

      <div className='flex justify-end items-center'>
        {hasLogout && (
          <IconClickable primaryMode onClick={logoutHandler}>
            <LogoutIcon textColor='text-white' className='rotate-180' />
          </IconClickable>
        )}
      </div>
    </div>
  );
}

export default TopBar;
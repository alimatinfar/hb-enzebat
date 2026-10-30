'use client'

import React from 'react';
import {LAYOUT_MAX_WIDTH, TOP_BAR_HEIGHT} from "@/constances/layout/mainLayoutExports";
import ArrowBack from "@/components/svg/ArrowBack";
import IconClickable from "@/components/others/Icon/IconClickable";
import UserIcon from "@/components/svg/UserIcon";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import ROUTER_LINKS from "@/constances/routerLinks";
import {getPanelLabelByPath} from "@/constances/panels";
import Z_INDEXES from "@/constances/zIndexes";

export type TopBarProps = {
  hasBack?: boolean;
  hasProfile?: boolean;
}

function TopBar(
  {hasBack, hasProfile}: TopBarProps
) {

  const router = useRouter()
  const pathname = usePathname()

  const panelLabel = getPanelLabelByPath(pathname)

  const onBackRoute = React.useCallback(function () {
    router.back()
  }, [router])

  return (
    <div
      style={{
        backgroundImage: `url(/login-top-background.png)`,
      }}
      className={`
        grid grid-cols-6 bg-primary rounded-b-xl fixed top-0 mx-auto w-full px-4 
        ${LAYOUT_MAX_WIDTH} ${TOP_BAR_HEIGHT} ${Z_INDEXES.topBar}
      `}>
      <div className='flex items-center'>
        {hasBack && (
          <IconClickable primaryMode onClick={onBackRoute}>
            <ArrowBack textColor='text-white' />
          </IconClickable>
        )}
      </div>

      <div className='col-span-4 flex flex-col items-center justify-center gap-y-1'>
        <p className='text-white text-3xl font-black'>
          انضباط
        </p>

        {panelLabel && (
          <span className='text-white/90 text-[11px] font-medium bg-white/15 rounded px-1.5 py-0.5 whitespace-nowrap'>
            {panelLabel}
          </span>
        )}
      </div>

      <div className='flex justify-end items-center'>
        {hasProfile && (
          <Link href={ROUTER_LINKS.PROFILE}>
            <IconClickable primaryMode>
              <UserIcon textColor='text-white' />
            </IconClickable>
          </Link>
        )}
      </div>
    </div>
  );
}

export default TopBar;

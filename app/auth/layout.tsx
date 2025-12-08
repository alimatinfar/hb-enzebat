import React from 'react';
import {ChildrenAndClassNamePropsType} from "@/types/ChildrenAndClassNamePropsType";
import {LAYOUT_MAX_WIDTH, LAYOUT_PADDING_X} from "@/constances/layout/mainLayoutExports";
import LoginMitraEventLogo from "@/components/svg/LogoAndTypo/LoginMitraEventLogo";


function AuthLayout(
  {children}: Pick<ChildrenAndClassNamePropsType, 'children'>
) {
  return (
    <div className={`
        flex flex-col absolute inset-0 h-full w-full z-10 ${LAYOUT_MAX_WIDTH}
      `}>
      <div
        style={{
          backgroundImage: `url(/login-top-background.png)`,
        }}
        className='flex-center bg-primary h-22 rounded-b-xl relative'>
        <p className='text-white text-3xl font-black'>
          انضباط
        </p>
        {/*<LoginMitraEventLogo className='absolute -bottom-[78px] inset-x-0 mx-auto'/>*/}
      </div>

      <div className={`
        ${LAYOUT_PADDING_X} pb-10 pt-20 h-full w-full
      `}>
        <div className='flex flex-col space-y-4 pt-10'>
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
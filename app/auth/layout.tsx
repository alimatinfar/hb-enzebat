import React from 'react';
import {ChildrenAndClassNamePropsType} from "@/types/ChildrenAndClassNamePropsType";
import TopBar from "@/components/layouts/TopBar";
import {CONTENT_PADDING_TOP} from "@/constances/layout/mainLayoutExports";


function AuthLayout(
  {children}: Pick<ChildrenAndClassNamePropsType, 'children'>
) {
  return (
    <>
      <TopBar />

      <div className={`flex flex-col justify-center h-full ${CONTENT_PADDING_TOP} pb-30`}>
        <div className='flex flex-col space-y-4 pb-10 pt-20 px-4'>
          {children}
        </div>
      </div>
    </>
  );
}

export default AuthLayout;
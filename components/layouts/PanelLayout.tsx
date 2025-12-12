import React from 'react';
import TopBar, {TopBarProps} from "@/components/layouts/TopBar";
import {
  CONTENT_PADDING_TOP,
  LAYOUT_PADDING_X,
  LAYOUT_PADDING_TOP,
  LAYOUT_PADDING_BOTTOM
} from "@/constances/layout/mainLayoutExports";
import {ChildrenAndClassNamePropsType} from "@/types/ChildrenAndClassNamePropsType";

type Props = {
  hasBottomFixedButton?: boolean;
} & Pick<TopBarProps, 'hasBack'> & Pick<ChildrenAndClassNamePropsType, 'children'>

function PanelLayout(
  {hasBack, children, hasBottomFixedButton}: Props
) {
  return (
    <>
      <TopBar
        hasBack={hasBack} hasLogout
      />

      <div className={`${CONTENT_PADDING_TOP}`}>
        <div className={`
          ${LAYOUT_PADDING_X} ${LAYOUT_PADDING_TOP} ${hasBottomFixedButton ? 'pb-25' : LAYOUT_PADDING_BOTTOM}
        `}>
          {children}
        </div>
      </div>
    </>
  );
}

export default PanelLayout;
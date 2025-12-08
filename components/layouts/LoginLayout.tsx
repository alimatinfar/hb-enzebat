import {ChildrenAndClassNamePropsType} from "@/types/ChildrenAndClassNamePropsType";
import {LAYOUT_MAX_WIDTH, LAYOUT_PADDING_X} from "@/constances/layout/mainLayoutExports";
import Button from "@/components/Form/Button/Button";
import React from "react";
import ReactHookFormWrapper from "@/components/Form/FormLayout/ReactHookFormWrapper/ReactHookFormWrapper";


type Props = {
  title: string;
  subTitle?: string;
  description: string;
  btnTitle: string;
  onSubmit: any;
  formMethods: any;
  loading?: boolean;
} & Pick<ChildrenAndClassNamePropsType, 'children'>

function LoginLayout(
  {
    children, title, subTitle, description, btnTitle, formMethods, onSubmit, loading
  }: Props
) {
  return (
    <>
      <div className='flex flex-col space-y-1'>
        <h1 className='font-bold text-xl'>
          {title}
        </h1>

        {subTitle && (
          <span>{subTitle}</span>
        )}

        <span>
          {description}
        </span>
      </div>

      <ReactHookFormWrapper
        formMethods={formMethods} onSubmit={onSubmit}
      >
        {children}

        <div className={`absolute bottom-10 inset-x-0 ${LAYOUT_MAX_WIDTH} ${LAYOUT_PADDING_X}`}>
          <Button
            fullWidth type='submit' loading={loading}
          >
            {btnTitle}
          </Button>
        </div>
      </ReactHookFormWrapper>
    </>
  );
}

export default LoginLayout;
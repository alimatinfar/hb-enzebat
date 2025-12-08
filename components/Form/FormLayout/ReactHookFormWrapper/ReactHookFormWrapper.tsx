import React, {ReactNode} from "react";
import {FormProvider} from "react-hook-form";
import HiddenButton from "./HiddenButton";

type Props = {
  formMethods: any,
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  className?: string;
  children: ReactNode;
  hiddenButton?: boolean;
}

function ReactHookFormWrapper({formMethods, onSubmit, className, children, hiddenButton}: Props) {
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit} className={className || ''}>
        {children}

        {hiddenButton && <HiddenButton />}
      </form>
    </FormProvider>
  );
}

export default ReactHookFormWrapper;
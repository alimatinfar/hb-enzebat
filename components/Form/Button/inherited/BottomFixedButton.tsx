import React from 'react';
import {ButtonProps} from "@/components/Form/Button/ButtonTypes";
import {LAYOUT_MAX_WIDTH, LAYOUT_PADDING_X} from "@/constances/layout/mainLayoutExports";
import Button from "@/components/Form/Button/Button";
import zIndexes from "@/constances/zIndexes";

function BottomFixedButton(props: ButtonProps) {
  return (
    <div className={`fixed bottom-5 inset-x-0 w-full ${LAYOUT_MAX_WIDTH} ${LAYOUT_PADDING_X} ${zIndexes.bottomFixedButton}`}>
      <Button
        fullWidth {...props}
      />
    </div>
  );
}

export default BottomFixedButton;
import Loading from "@/components/others/Loading/Loading";
import React, {ReactNode, Suspense} from "react";


type Props = {
  children: ReactNode;
  minHeight?: string;
}

function RenderLogicDefaultContainer({children, minHeight}: Props) {
  return (
    <Suspense fallback={<Loading size='sm' />}>
      <div className={`
        flex-1 w-full h-full flex items-center justify-center text-center
        ${minHeight || 'min-h-[300px]'}
      `}>
        {children}
      </div>
    </Suspense>
  )
}

export default RenderLogicDefaultContainer
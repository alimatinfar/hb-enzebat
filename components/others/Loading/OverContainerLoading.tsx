import React from "react";
import Loading from "./Loading";
import Z_INDEXES from "@/constances/zIndexes";


type Props = {
  loading: boolean;
  overlayPage?: boolean;
  hasContainer?: boolean;
}

function OverContainerLoading({loading, overlayPage, hasContainer}: Props) {

  const loadingElement = <Loading size='lg' />

  return (
    <div className={`flex items-center justify-center inset-0 bg-black/10 duration-200 ${overlayPage ? `fixed w-screen h-screen ${Z_INDEXES.overlayPageLoading}` : 'absolute w-full h-full'} ${loading ? '' : 'opacity-0 pointer-events-none'}`}>
      {hasContainer ? (
        <div className='bg-transparent rounded-md p-14'>
          {loadingElement}
        </div>
      ) : <>{loadingElement}</>}
    </div>
  );
}

export default OverContainerLoading
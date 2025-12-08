import React, {lazy} from 'react';

const EmptyStateIcon = lazy(() => import("../../svg/RenderLogic/EmptyStateIcon"));

type Props = {
  title: string
}

function EmptyState({title}: Props) {
  return (
    <div className='flex flex-col items-center space-y-2'>
      <EmptyStateIcon />
      <p className='text-gray-900'>
        {title}
      </p>
    </div>
  );
}

export default EmptyState;
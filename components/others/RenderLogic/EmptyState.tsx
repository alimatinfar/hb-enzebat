import React, {ReactNode} from 'react';


type Props = {
  title?: string;
  description?: string;
  icon?: ReactNode;
}

function EmptyState({title, description, icon}: Props) {
  return (
    <div className='py-10 px-5 flex flex-col items-center max-w-72 mx-auto'>
      {icon && (
        <div className='mb-3'>
          {icon}
        </div>
      )}

      <p className='text-sm font-medium text-center'>
        {title || 'نتيجه اي يافت نشد!'}
      </p>

      {description && (
        <p className='text-xs mt-2 text-gray-500 text-center leading-4'>
          {description}
        </p>
      )}
    </div>
  );
}

export default EmptyState;
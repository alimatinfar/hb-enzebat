

type Props = {
  title: string | number;
  value: string | number;
  titleClass?: string;
  valueClass?: string;
}

function KeyValue(
  {title, value, titleClass, valueClass}: Props
) {
  return (
    <div className='flex items-center justify-between space-x-2'>
      <span className={titleClass || 'text-gray-500'}>{title}:</span>
      <span className={valueClass || 'font-medium text-lg'}>{value}</span>
    </div>
  );
}

export default KeyValue;
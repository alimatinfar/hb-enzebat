'use client'

import KeyValue, {KeyValueProps} from "@/components/others/KeyValue/KeyValue";
import Card from "@/components/others/Card/Card";
import {ReactNode} from "react";


type Props = {
  title: string;
  keyValues: KeyValueProps[];
  bgIsGray?: boolean;
  children?: ReactNode;
}

function ReportCard(
  {title, keyValues, bgIsGray, children}: Props
) {
  return (
    <Card>
      <p className='text-center font-semibold pb-2'>
        {title}
      </p>

      <div className='flex flex-col gap-y-1'>
        {keyValues.map((keyValueProps, index) => (
          <KeyValue key={index} {...keyValueProps} />
        ))}
      </div>

      {children && (
        <div className='pt-4'>
          {children}
        </div>
      )}
    </Card>
  );
}

export default ReportCard;
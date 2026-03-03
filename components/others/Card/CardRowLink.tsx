import Link from "next/link";
import {ReactNode} from "react";
import ArrowIcon from "@/components/svg/ArrowIcon";


type Props = {
  link: string;
  children: ReactNode;
}

function CardRowLink(
  {link, children}: Props
) {
  return (
    <Link href={link} className='flex items-center justify-between rounded-md p-2 hover:bg-gray-2 duration-200'>
      {children}

      <ArrowIcon className='rotate-90' />
    </Link>
  );
}

export default CardRowLink;
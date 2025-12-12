import {IconPropsType} from "@/types/IconPropsType";

function TickIcon({className, textColor}: IconPropsType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      {...className && {className}}
    >
      <path
        className={`fill-current duration-200 ${textColor || 'text-gray-500'}`}
        d="m8.333 12.643 7.66-7.66 1.18 1.178L8.333 15 3.03 9.697l1.178-1.179z"
      ></path>
    </svg>
  )
}

export default TickIcon
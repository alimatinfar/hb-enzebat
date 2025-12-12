import {IconPropsType} from "@/types/IconPropsType";


function LogoutIcon({textColor, className}: IconPropsType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...className && {className}}
    >
      <path
        className={`stroke-current duration-200 ${textColor || 'text-red-500'}`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M14.647 7.8V5.7c0-.557-.223-1.091-.62-1.485a2.13 2.13 0 0 0-1.498-.615H5.118c-.562 0-1.1.221-1.498.615S3 5.143 3 5.7v12.6c0 .557.223 1.091.62 1.485s.936.615 1.498.615h7.411c.562 0 1.1-.221 1.498-.615a2.1 2.1 0 0 0 .62-1.485v-2.1M8.294 12H21m0 0-3.177-3.15M21 12l-3.177 3.15"
      ></path>
    </svg>
  );
}

export default LogoutIcon;
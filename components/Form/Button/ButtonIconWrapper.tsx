import {ReactNode} from "react";


type Props = {
  children: ReactNode;
  className?: string;
}

function ButtonIconWrapper({children, className = ''}: Props) {
  return children ? (
    <div className={`h-full aspect-square ${className}`}>
      {children}
    </div>
  ) : null
}

export default ButtonIconWrapper
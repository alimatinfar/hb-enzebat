import TickIcon from "@/components/svg/TickIcon";
import InputLabel, {InputLabelProps} from "../Input/InputLabel";


export type CheckBoxProps = {
  name?: string;
  value?: boolean;
  onChange?: (e: boolean) => void;
  wrapperClass?: string;
  indeterminate?: boolean;
  disabled?: boolean;
} & Pick<InputLabelProps, 'label' | 'info'>

function CheckBox({name, value, onChange, label, wrapperClass, indeterminate, disabled, info}: CheckBoxProps) {

  function checkHandler() {
    if (disabled) return
    onChange && onChange(!value);
  }

  return (
    <label
      htmlFor={name}
      className={`flex items-center w-fit ${wrapperClass || ''}`}
    >
      <div
        className={`w-5 h-5 box-border rounded-sm select-none transition-all border flex items-center justify-center duration-100 overflow-hidden 
        ${disabled ? "bg-gray-300 border-gray-400" : (value && !indeterminate) ? "bg-primary border-transparent" : "bg-white"} ${indeterminate ? 'p-[3px]' : ''} 
        ${disabled ? "" : "border-gray-300 hover:border-primary cursor-pointer"}`}
        onClick={checkHandler}
      >
        <div
          className={`w-full h-full transition-all flex items-center justify-center
          ${(value || indeterminate) ? "" : "scale-0"} ${indeterminate ? disabled ? "bg-gray-500" : `bg-primary rounded-[1px]` : ''} `}
        >
          {(!indeterminate && value) && <TickIcon textColor={disabled ? "text-gray-500" : "text-white"}/>}
        </div>
      </div>
      {label && (
        <InputLabel
          label={label} disabled={disabled} className='cursor-pointer pr-2' onClick={checkHandler}
          info={info} marginClass='m-0'
        />
      )}
    </label>
  )
}

export default CheckBox
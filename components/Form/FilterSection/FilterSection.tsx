import ReactHookFormWrapper, {
  ReactHookFormWrapperProps
} from "@/components/Form/FormLayout/ReactHookFormWrapper/ReactHookFormWrapper";
import {ChildrenAndClassNamePropsType} from "@/types/ChildrenAndClassNamePropsType";
import Card from "@/components/others/Card/Card";
import ArrowIcon from "@/components/svg/ArrowIcon";
import DisplayWithAnimation from "@/components/others/DisplayWithAnimation/DisplayWithAnimation";
import useModalOpen from "@/hooks/modal/useModalOpen";


type Props = Pick<ReactHookFormWrapperProps, 'formMethods' | 'onSubmit'> &
  Pick<ChildrenAndClassNamePropsType, 'children'>

function FilterSection(
  {children, onSubmit, formMethods}: Props
) {


  const {open, setModalState: setOpen} = useModalOpen<boolean>(false)

  function toggleOpenHandler() {
    setOpen(prev => !prev);
  }

  return (
    <ReactHookFormWrapper
      onSubmit={onSubmit} formMethods={formMethods} className='mb-4'
    >
      <Card className='flex flex-col' backgroundClass='bg-gray-100'>
        <div
          className='flex items-center justify-between gap-x-4 cursor-pointer w-full'
          onClick={toggleOpenHandler}
        >
          <p>
            فیلترها
          </p>

          <ArrowIcon className={`${open ? 'rotate-180' : ''} duration-200`} />
        </div>

        <DisplayWithAnimation show={open} expandMode>
          <div className='pt-2'>
            {children}
          </div>
        </DisplayWithAnimation>
      </Card>
    </ReactHookFormWrapper>
  );
}

export default FilterSection;
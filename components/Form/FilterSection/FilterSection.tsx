import ReactHookFormWrapper, {
  ReactHookFormWrapperProps
} from "@/components/Form/FormLayout/ReactHookFormWrapper/ReactHookFormWrapper";
import {ChildrenAndClassNamePropsType} from "@/types/ChildrenAndClassNamePropsType";
import Card from "@/components/others/Card/Card";
import ArrowIcon from "@/components/svg/ArrowIcon";
import DisplayWithAnimation from "@/components/others/DisplayWithAnimation/DisplayWithAnimation";
import useModalOpen from "@/hooks/modal/useModalOpen";
import Button from "@/components/Form/Button/Button";


type Props = Pick<ReactHookFormWrapperProps, 'formMethods' | 'onSubmit'> &
  Pick<ChildrenAndClassNamePropsType, 'children'> & {
    defaultOpen?: boolean;
    hasActiveFilter?: boolean;
    onResetFilters?: () => void;
  }

function FilterSection(
  {children, onSubmit, formMethods, defaultOpen, hasActiveFilter, onResetFilters}: Props
) {


  const {open, setModalState: setOpen} = useModalOpen<boolean>(Boolean(defaultOpen))

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
          <div className='pt-4'>
            {children}

            <Button size='sm' type='submit' fullWidth>
              جستجو
            </Button>

            {(hasActiveFilter && onResetFilters) && (
              <Button
                type='button' variant='link' size='sm' fullWidth
                onClick={onResetFilters} className={{extra: 'mt-2'}}
              >
                حذف فیلتر
              </Button>
            )}
          </div>
        </DisplayWithAnimation>
      </Card>
    </ReactHookFormWrapper>
  );
}

export default FilterSection;
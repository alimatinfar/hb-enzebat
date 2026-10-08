import ReactHookFormWrapper, {
  ReactHookFormWrapperProps
} from "@/components/Form/FormLayout/ReactHookFormWrapper/ReactHookFormWrapper";
import {ChildrenAndClassNamePropsType} from "@/types/ChildrenAndClassNamePropsType";
import Card from "@/components/others/Card/Card";
import ArrowIcon from "@/components/svg/ArrowIcon";
import DisplayWithAnimation from "@/components/others/DisplayWithAnimation/DisplayWithAnimation";
import useModalOpen from "@/hooks/modal/useModalOpen";
import Button from "@/components/Form/Button/Button";


type Props = {
  defaultOpen?: boolean;
  onResetFilters?: () => void;
  activeFilterCount: number;
} & Pick<ReactHookFormWrapperProps, 'formMethods' | 'onSubmit'> &
  Pick<ChildrenAndClassNamePropsType, 'children'>

function FilterSection(
  {
    children, onSubmit, formMethods, defaultOpen, onResetFilters, activeFilterCount
  }: Props
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
          <div className='flex items-center gap-x-1'>
            <p>
              فیلترها
            </p>

            {!!activeFilterCount && (
              <span className='bg-primary/10 p-1 rounded-full text-primary font-medium text-xs aspect-square min-w-6 text-center'>
                {activeFilterCount}
              </span>
            )}
          </div>

          <ArrowIcon className={`${open ? 'rotate-180' : ''} duration-200`}/>
        </div>

        <DisplayWithAnimation show={open} expandMode>
          <div className='pt-4'>
            {children}

            <Button size='sm' type='submit' fullWidth variant='default' color='white'>
              جستجو
            </Button>

            {(!!activeFilterCount && onResetFilters) && (
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
import React, {useEffect, useImperativeHandle, useRef, useState, RefObject} from "react";
import Modal from "@/components/others/Modal/Modal";
import Button from "@/components/Form/Button/Button";
import SearchInputRender from "@/components/Form/Input/inheritedInputs/SearchInput/SearchInputRender";
import ScrollPagination from "@/components/others/ScrollPagination/ScrollPagination";
import SelectOptionsSkeleton from "./SelectOptionsSkeleton";
import SelectDropDownOption from "./SelectDropDownOption/SelectDropDownOption";
import {
  SelectOptionOnClickType, SelectOptionType, SelectProps, SelectDropDownScrollPagination
} from "./select-exports";

export type SelectOptionsModalRefType = {
  scrollToTop: any;
};

type SelectOptionsModalProps =
  {
    modalRef: RefObject<SelectOptionsModalRefType | null>,
    open: boolean,
    onClose: () => void,
    title?: string,
    filteredOptions: SelectOptionType[],
    mode: SelectProps['mode'],
    value: SelectProps['value'],
    optionOnClick: SelectOptionOnClickType,
    onSubmitDraft: (draft: SelectOptionType[]) => void,
    onQuery: (e: any) => void,
    optionStartAdornment: SelectProps['optionStartAdornment'],
    optionEndAdornment: SelectProps['optionEndAdornment']
  } & SelectDropDownScrollPagination

const SelectOptionsModal = (
  {
    modalRef, open, onClose, title, filteredOptions, mode, value, optionOnClick, onSubmitDraft, onQuery,
    allCount, rowsPerPage, currentPage, setPage, loading, overlayLoading, optionEndAdornment, optionStartAdornment
  }: SelectOptionsModalProps
) => {

  const overflowElementRef = useRef<HTMLDivElement>(null);

  // انتخاب‌های موقت (چون فقط با دکمه ثبت باید ست بشن)
  const [draft, setDraft] = useState<SelectOptionType[]>([]);

  useEffect(function () {
    if (!open) return
    // با هر بار باز شدن مدال، انتخاب فعلی به عنوان مقدار اولیه در نظر گرفته می‌شود
    setDraft(Array.isArray(value) ? [...value] : [])
  }, [open]);

  function scrollToTop() {
    if (!overflowElementRef.current) return;
    overflowElementRef.current.scrollTop = 0
  }

  useImperativeHandle(
    modalRef,
    () => ({
      scrollToTop,
    }),
    // eslint-disable-next-line react-hooks/refs
    [overflowElementRef?.current]
  );

  function toggleDraftOption(option: SelectOptionType) {
    const isExists = draft && Boolean(draft.find((item: SelectOptionType) => item.id === option.id));
    setDraft(isExists
      ? draft.filter((item: SelectOptionType) => item.id !== option.id)
      : [...draft || [], option]
    )
  }

  function optionClickHandler(e: any, option: SelectOptionType) {
    if (mode === 'multiple') {
      toggleDraftOption(option)
      e.stopPropagation()
      return
    }

    // انتخاب تکی: بعد از انتخاب، مدال بسته می‌شود
    optionOnClick(e, option)
  }

  function submitDraftHandler() {
    onSubmitDraft(draft)
  }

  return (
    <Modal
      open={open} onClose={onClose}
      title={title || 'انتخاب کنید'}
    >
      <SearchInputRender onChange={onQuery}/>

      <div
        ref={overflowElementRef}
        className="overflow-auto scroll-thin max-h-72 mt-4"
      >
        <ScrollPagination
          allCount={allCount || 0} currentPage={currentPage || 1} isEmpty={filteredOptions.length === 0 && !loading}
          rowsPerPage={rowsPerPage || 10} overflowElement={overflowElementRef?.current} overlayLoading={overlayLoading}
          setPage={(page) => setPage ? setPage(page) : null} loading={Boolean(loading)} detectEndScrollByPosition
          overlayLoadingComponent={<SelectOptionsSkeleton count={3}/>}
          paginationLoadingComponent={<SelectOptionsSkeleton count={1}/>}
        >
          <div className='flex flex-col space-y-1'>
            {
              filteredOptions?.map((option) => {
                let isActive = false;

                if (mode === "multiple") {
                  // انتخاب چندتایی بر اساس لیست موقت مدال است نه مقدار نهایی
                  isActive = draft && Boolean(draft.find((item: SelectOptionType) => item.id === option.id));
                } else {
                  // @ts-ignore
                  isActive = value && option.id === value?.id;
                }

                return (
                  <SelectDropDownOption
                    key={String(option.id)}
                    {...{
                      optionEndAdornment, optionStartAdornment, optionOnClick: optionClickHandler, option, isActive, mode
                    }}
                  />
                )
              })
            }
          </div>
        </ScrollPagination>
      </div>

      {mode === 'multiple' && (
        <Button fullWidth size='sm' onClick={submitDraftHandler} className={{extra: 'mt-4'}}>
          ثبت
        </Button>
      )}
    </Modal>
  )
}

export default SelectOptionsModal

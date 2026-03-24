import React, {forwardRef, RefObject, useImperativeHandle, useRef} from "react";
import zIndexes from "../../../constances/zIndexes";
import {SelectOptionOnClickType, SelectOptionType, SelectProps, SelectDropDownScrollPagination} from "./select-exports";
import ScrollPagination from "../../others/ScrollPagination/ScrollPagination";
import SelectOptionsSkeleton from "./SelectOptionsSkeleton";
import SelectDropDownOption from "./SelectDropDownOption/SelectDropDownOption";


export type SelectDropDownRefType = {
  scrollToTop: any;
};

type SelectDropDownProps =
  {
    dropDownRef: RefObject<HTMLDivElement | null>,
    dropDownStyle: object,
    dropDownOpen: boolean,
    filteredOptions: SelectOptionType[],
    mode: SelectProps['mode'],
    value: SelectProps['value'],
    optionOnClick: SelectOptionOnClickType,
    optionStartAdornment: SelectProps['optionStartAdornment'],
    optionEndAdornment: SelectProps['optionEndAdornment']
  } & SelectDropDownScrollPagination

const SelectDropDown: React.ForwardRefRenderFunction<SelectDropDownRefType, SelectDropDownProps> = (
  {
    dropDownRef, dropDownStyle, dropDownOpen, filteredOptions, mode, value, optionOnClick,
    allCount, rowsPerPage, currentPage, setPage, loading, overlayLoading, optionEndAdornment, optionStartAdornment
  }, ref
) => {

  const overflowElementRef = useRef<HTMLDivElement>(null);

  function scrollToTop() {
    if (!overflowElementRef.current) return;
    overflowElementRef.current.scrollTop = 0
  }

  useImperativeHandle(
    ref,
    () => ({
      scrollToTop,
    }),
    // eslint-disable-next-line react-hooks/refs
    [overflowElementRef?.current]
  );

  return (
    <div
      ref={dropDownRef}
      style={dropDownStyle}
      className={`
        fixed ${zIndexes.selectDropDown}
        p-2 shadow rounded-md duration-200 bg-white origin-top
        ${dropDownOpen ? "" : "opacity-0 pointer-events-none scale-[0.99]"}
      `}
    >
      <div
        ref={overflowElementRef}
        className="overflow-auto scroll-thin max-h-52"
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
                  // @ts-ignore
                  isActive = value && Boolean(value?.find((item: SelectOptionType) => item.id === option.id));
                } else {
                  // @ts-ignore
                  isActive = value && option.id === value?.id;
                }

                return (
                  <SelectDropDownOption
                    key={String(option.id)}
                    {...{
                      optionEndAdornment, optionStartAdornment, optionOnClick, option, isActive, mode
                    }}
                  />
                )
              })
            }
          </div>
        </ScrollPagination>
      </div>
    </div>
  )
}

export default forwardRef(SelectDropDown)
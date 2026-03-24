import {InputProps} from "../Input/types/InputProps";
import {ScrollPaginationProps} from "../../others/ScrollPagination/ScrollPagination";


export type SelectOptionType = {
  id: string | boolean | number
  name: string;
  description?: string;
};


export type SelectDropDownScrollPagination =
  Partial<Pick<ScrollPaginationProps, 'allCount' | 'rowsPerPage' | 'currentPage' | 'setPage' | 'loading' | 'overlayLoading'>>

export type SelectProps = {
  name: InputProps["name"];
  disabled?: InputProps["disabled"];
  inputProps?: InputProps;
  alwaysShouldHaveSearch?: boolean;
  removeCloseIcon?: boolean;
  optionStartAdornment?: InputProps["startAdornment"];
  optionEndAdornment?: InputProps["endAdornment"];
  apiAddress?: string;
  apiOptionKey?: string;
  apiOptionValue?: string;
  options?: SelectOptionType[];
  loading?: boolean;
  mode?: "single" | "multiple";
  onSelect: (value: any) => void;
  value: any;
}

export type SelectOptionOnClickType = (e: any, selectValue: SelectOptionType) => void

export const SELECT_PLACEHOLDER = 'انتخاب کنید'
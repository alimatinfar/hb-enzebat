export type FilterType<T> = {
  data: T;
  currentPage: number;
  rowsPerPage: number;
}
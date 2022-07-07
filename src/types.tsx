export type Order = 'asc' | 'desc';
export type SortText = 'Ascending' | 'Descending';
export type ResponseKind = 'success' | 'failure';
export type NetworkResponse<T> = {
  kind: ResponseKind;
  body?: T;
};

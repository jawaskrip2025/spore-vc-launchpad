export type TQueryParam = {
  page?: number | string
  pageSize?: number | string
  search?: string
  [key: string]: string | number | undefined
}
export type TOptionList = {
  value: string
  label: string
  logo?: string
  icon?: string
  type?: string
  ticker?: string
}
export type TFormActionType = "create" | "update"
type TFormSubmitProps<T> = {
  mode: TFormActionType
  data: T
}
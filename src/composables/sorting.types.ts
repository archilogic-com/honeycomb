export enum SortingTypes {
  Asc = 'asc',
  Desc = 'desc'
}

export type SortingType = SortingTypes.Asc | SortingTypes.Desc | undefined

export interface Header {
  value: string
  text: string
}

export interface SortingParameters {
  sortDefault?: string
  sortInitial?: string
  onChange?: () => void
}

import { Ref, ref } from 'vue'
import { SortingParameters, SortingTypes, SortingType } from './sorting.types'

const SYMBOL_DESC = '-'

export type SortingComposable = {
  sort: Ref<string>
  isAscending: Ref<boolean>
  updateSortType: (sort: string) => void
  sortData: <T extends Record<string, unknown>>(data: T[]) => T[]
  isSortActive: (sort: string) => boolean
  getSortIndicator: (header: string) => SortingType | undefined
}

export const useSorting = ({
  sortDefault = '',
  sortInitial = '',
  onChange = () => {}
}: SortingParameters = {}): SortingComposable => {
  const sort = ref(sortInitial ? sortInitial.replace(SYMBOL_DESC, '') : '')
  const isAscending = ref(sortInitial.indexOf(SYMBOL_DESC) < 0)

  const validateWithCheckForNull = <T extends Record<string, unknown>>(
    a: T,
    b: T,
    compare: (a: string | number, b: string | number) => number
  ): number => {
    if (a[sort.value] == null) {
      return -1
    }
    if (b[sort.value] == null) {
      return 1
    }
    return compare(a[sort.value] as string | number, b[sort.value] as string | number)
  }

  const getValidatorForStrings = (a: string | number, b: string | number) =>
    String(a).localeCompare(String(b))
  const getValidatorForNumbers = (a: string | number, b: string | number) => Number(a) - Number(b)

  const getValidatorForStringsByOrder = <T extends Record<string, unknown>>() => {
    return isAscending.value
      ? (a: T, b: T) => validateWithCheckForNull(a, b, getValidatorForStrings)
      : (b: T, a: T) => validateWithCheckForNull(a, b, getValidatorForStrings)
  }
  const getValidatorForNumbersByOrder = <T extends Record<string, unknown>>() => {
    return isAscending.value
      ? (a: T, b: T) => validateWithCheckForNull(a, b, getValidatorForNumbers)
      : (b: T, a: T) => validateWithCheckForNull(a, b, getValidatorForNumbers)
  }

  const getValidator = (item: unknown) => {
    if (typeof item === 'string') return getValidatorForStringsByOrder()
    if (typeof item === 'number') return getValidatorForNumbersByOrder()
    return undefined
  }

  const sortData = <T extends Record<string, unknown>>(data: T[]): T[] => {
    if (!sort.value) {
      sort.value = sortDefault ? sortDefault.replace(SYMBOL_DESC, '') : ''
      isAscending.value = sortDefault.indexOf(SYMBOL_DESC) < 0
    }

    const item = data.find(item => item[sort.value])
    if (!item || !item[sort.value]) {
      return data
    }

    const validator = getValidator(item[sort.value])
    if (validator) {
      return data.slice().sort(validator)
    }

    return data
  }

  const isSortActive = (value: string) => sort.value === value

  const updateSortType = (value: string) => {
    if (isSortActive(value)) {
      if (!isAscending.value) {
        sort.value = ''
      }
      isAscending.value = !isAscending.value
    } else {
      sort.value = value
      isAscending.value = true
    }
    onChange()
  }

  const getSortIndicator = (header: string): SortingType | undefined => {
    if (isSortActive(header)) {
      return isAscending.value ? SortingTypes.Asc : SortingTypes.Desc
    }
  }

  return {
    sort,
    isAscending,
    updateSortType,
    sortData,
    isSortActive,
    getSortIndicator
  }
}

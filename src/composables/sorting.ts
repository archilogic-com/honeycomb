import { Ref, ref } from 'vue'
import { SortingParameters, SortingTypes, SortingType } from './sorting.types'

const SYMBOL_DESC = '-'

export type SortingComposable = {
  sort: Ref<string>
  isAscending: Ref<boolean>
  updateSortType: (sort: string) => void
  sortData: (data: any) => any
  isSortActive: (sort: string) => boolean
  getSortIndicator: (header: string) => SortingType
}

export const useSorting = ({
  sortDefault = '',
  sortInitial = '',
  onChange = () => {}
}: SortingParameters = {}): SortingComposable => {
  const sort = ref(sortInitial ? sortInitial.replace(SYMBOL_DESC, '') : '')
  const isAscending = ref(sortInitial.indexOf(SYMBOL_DESC) < 0)

  const validateWithCheckForNull = (a: any, b: any, compare: (a: any, b: any) => number) => {
    if (a[sort.value] == null) {
      return -1
    }
    if (b[sort.value] == null) {
      return 1
    }
    return compare(a[sort.value], b[sort.value])
  }

  const getValidatorForStrings = (a: string, b: string) => a.localeCompare(b)
  const getValidatorForNumbers = (a: number, b: number) => a - b

  const getValidatorForStringsByOrder = () => {
    return isAscending.value
      ? (a: string, b: string) => validateWithCheckForNull(a, b, getValidatorForStrings)
      : (b: string, a: string) => validateWithCheckForNull(a, b, getValidatorForStrings)
  }
  const getValidatorForNumbersByOrder = () => {
    return isAscending.value
      ? (a: number, b: number) => validateWithCheckForNull(a, b, getValidatorForNumbers)
      : (b: number, a: number) => validateWithCheckForNull(a, b, getValidatorForNumbers)
  }

  const getValidator = (item: string | number) => {
    if (typeof item === 'string') return getValidatorForStringsByOrder()
    if (typeof item === 'number') return getValidatorForNumbersByOrder()
  }

  const sortData = (data: any) => {
    if (!sort.value) {
      sort.value = sortDefault ? sortDefault.replace(SYMBOL_DESC, '') : ''
      isAscending.value = sortDefault.indexOf(SYMBOL_DESC) < 0
    }

    const item = data.find((item: any) => item[sort.value])
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

  const getSortIndicator = (header: string): SortingType => {
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

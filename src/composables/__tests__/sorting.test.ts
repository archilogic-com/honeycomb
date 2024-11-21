import { useSorting, SortingComposable } from '../sorting'

const item1 = {
  stringProperty: 'a',
  numberProperty: 1
} as const

type TestItem = {
  stringProperty: string | null
  numberProperty: number | null
}

const item2 = {
  stringProperty: 'b',
  numberProperty: 2
}
const item3 = {
  stringProperty: null,
  numberProperty: null
}
const testData = [item1, item2, item3]

describe('useSorting', () => {
  let sortingModule: SortingComposable
  let sortedData: TestItem[]
  const onChange = vi.fn()

  afterEach(vi.resetAllMocks)

  describe('when used with an empty array', () => {
    beforeEach(() => {
      sortingModule = useSorting()
      sortedData = sortingModule.sortData([])
    })

    it('does nothing', () => {
      expect(sortedData.length).toEqual(0)
    })
  })

  describe('when used with data', () => {
    beforeEach(() => {
      sortingModule = useSorting({ onChange })
    })

    describe('updateSortType', () => {
      describe('when called the first time', () => {
        beforeEach(() => {
          sortingModule.updateSortType('stringProperty')
        })

        it('sets the sorted property, sets the sorting order to ascending, and calls the callback', () => {
          expect(sortingModule.sort.value).toEqual('stringProperty')
          expect(sortingModule.isAscending.value).toEqual(true)
          expect(onChange).toHaveBeenCalledTimes(1)
        })

        describe('then called a second time', () => {
          beforeEach(() => {
            sortingModule.updateSortType('stringProperty')
          })

          it('does not change the sorted property, sets the sorting order to descending, and calls the callback', () => {
            expect(sortingModule.sort.value).toEqual('stringProperty')
            expect(sortingModule.isAscending.value).toEqual(false)
            expect(onChange).toHaveBeenCalledTimes(2)
          })

          describe('then called a third time', () => {
            beforeEach(() => {
              sortingModule.updateSortType('stringProperty')
            })

            it('resets the sorted property, sets the sorting order to ascending, and calls the callback', () => {
              expect(sortingModule.sort.value).toEqual('')
              expect(sortingModule.isAscending.value).toEqual(true)
              expect(onChange).toHaveBeenCalledTimes(3)
            })
          })
        })
      })
    })

    it('sorts an array of items by string (asc)', () => {
      sortingModule.updateSortType('stringProperty')
      sortedData = sortingModule.sortData(testData)
      expect(sortedData).toEqual([item3, item1, item2])
    })

    it('sorts an array of items by string (desc)', () => {
      sortingModule.updateSortType('stringProperty')
      sortingModule.updateSortType('stringProperty')
      sortedData = sortingModule.sortData(testData)
      expect(sortedData).toEqual([item2, item1, item3])
    })

    it('sorts an array of items by number (asc)', () => {
      sortingModule.updateSortType('numberProperty')
      sortedData = sortingModule.sortData(testData)
      expect(sortedData).toEqual([item3, item1, item2])
    })

    it('sorts an array of items by number (desc)', () => {
      sortingModule.updateSortType('numberProperty')
      sortingModule.updateSortType('numberProperty')
      sortedData = sortingModule.sortData(testData)
      expect(sortedData).toEqual([item2, item1, item3])
    })
  })

  describe('when initialized with an initial sort value', () => {
    beforeEach(() => {
      sortingModule = useSorting({ sortInitial: 'stringProperty' })
    })

    it('sets the sorted property and the sorting order', () => {
      expect(sortingModule.sort.value).toEqual('stringProperty')
      expect(sortingModule.isAscending.value).toEqual(true)
    })
  })

  describe('when initialized with an initial sort value', () => {
    beforeEach(() => {
      sortingModule = useSorting({ sortInitial: '-numberProperty' })
    })

    it('sets the sorted property and the sorting order', () => {
      expect(sortingModule.sort.value).toEqual('numberProperty')
      expect(sortingModule.isAscending.value).toEqual(false)
    })
  })

  describe('when initialized with a default sort value', () => {
    beforeEach(() => {
      sortingModule = useSorting({ sortDefault: '-numberProperty' })
      sortedData = sortingModule.sortData(testData)
    })

    it('sorts by the default sort', () => {
      expect(sortedData).toEqual([item2, item1, item3])
    })
  })
})

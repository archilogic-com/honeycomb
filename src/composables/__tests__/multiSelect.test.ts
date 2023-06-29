import { ref, Ref, nextTick } from 'vue'
import useMultiSelect from '../multiSelect'
const shiftEvent = new MouseEvent('click', { shiftKey: true })
const noShiftEvent = new MouseEvent('click', { shiftKey: false })
const noShiftCtrlEvent = new MouseEvent('click', { shiftKey: false, ctrlKey: true })

describe('multiSelect', () => {
  describe('when no initial selection is provided', () => {
    it('initializes an empty list', () => {
      const { selectedItems } = useMultiSelect(['one', 'two'])
      expect(selectedItems.size).toBe(0)
    })
  })
  describe('when initial selection is provided', () => {
    it('initializes the selected items with provided data', () => {
      const { selectedItems } = useMultiSelect(['one', 'two'], false, ['one', 'two'])
      expect(selectedItems.size).toBe(2)
      expect(selectedItems.has('one')).toBe(true)
      expect(selectedItems.has('two')).toBe(true)
    })
  })

  describe('when `selectItem` method is called', () => {
    describe('and shift key is pressed', () => {
      describe('and no items are selected', () => {
        it('selects all items from the beginning of the list until the newly selected item', () => {
          const { selectedItems, selectItem } = useMultiSelect(['one', 'two', 'three', 'four'])

          selectItem('three', shiftEvent)
          expect(selectedItems.size).toBe(3)
          expect(selectedItems.has('one')).toBe(true)
          expect(selectedItems.has('two')).toBe(true)
          expect(selectedItems.has('three')).toBe(true)
          expect(selectedItems.has('four')).toBe(false)
        })
      })
      describe('and there are preselected items but no manually selected', () => {
        it('selects all items from the beginning of the list until the newly selected item', () => {
          const { selectedItems, selectItem } = useMultiSelect(
            ['one', 'two', 'three', 'four', 'five'],
            false,
            ['two', 'five']
          )

          selectItem('three', shiftEvent)
          expect(selectedItems.size).toBe(4)
          expect(selectedItems.has('one')).toBe(true)
          expect(selectedItems.has('two')).toBe(true)
          expect(selectedItems.has('three')).toBe(true)
          expect(selectedItems.has('four')).toBe(false)
          expect(selectedItems.has('five')).toBe(true)
        })
      })

      describe('and there are selected items', () => {
        it('adds all items after the last selected item until the newly selected item', () => {
          const { selectedItems, selectItem } = useMultiSelect([
            'one',
            'two',
            'three',
            'four',
            'five'
          ])
          selectItem('three', noShiftEvent)

          selectItem('five', shiftEvent)
          expect(selectedItems.size).toBe(3)
          expect(selectedItems.has('one')).toBe(false)
          expect(selectedItems.has('two')).toBe(false)
          expect(selectedItems.has('three')).toBe(true)
          expect(selectedItems.has('four')).toBe(true)
          expect(selectedItems.has('five')).toBe(true)
        })
        it('adds all items before last selected item until newly selected item', () => {
          const { selectedItems, selectItem } = useMultiSelect([
            'one',
            'two',
            'three',
            'four',
            'five'
          ])

          selectItem('three', noShiftEvent)

          selectItem('one', shiftEvent)
          expect(selectedItems.size).toBe(3)
          expect(selectedItems.has('one')).toBe(true)
          expect(selectedItems.has('two')).toBe(true)
          expect(selectedItems.has('three')).toBe(true)
          expect(selectedItems.has('four')).toBe(false)
          expect(selectedItems.has('five')).toBe(false)
        })
        it("keeps any selected items outside shift key's selection as is", () => {
          const { selectedItems, selectItem } = useMultiSelect([
            'one',
            'two',
            'three',
            'four',
            'five'
          ])
          selectItem('one', noShiftEvent)
          selectItem('three', noShiftCtrlEvent)

          selectItem('five', shiftEvent)
          expect(selectedItems.size).toBe(4)
          expect(selectedItems.has('one')).toBe(true)
          expect(selectedItems.has('two')).toBe(false)
          expect(selectedItems.has('three')).toBe(true)
          expect(selectedItems.has('four')).toBe(true)
          expect(selectedItems.has('five')).toBe(true)
        })

        describe('when the user `shift + click`s multiple times', () => {
          it('makes a new selection starting from the same item in both directions', () => {
            const { selectedItems, selectItem } = useMultiSelect([
              'one',
              'two',
              'three',
              'four',
              'five'
            ])
            selectItem('three', noShiftEvent)

            selectItem('five', shiftEvent)
            expect(selectedItems.size).toBe(3)
            expect(selectedItems.has('one')).toBe(false)
            expect(selectedItems.has('two')).toBe(false)
            expect(selectedItems.has('three')).toBe(true)
            expect(selectedItems.has('four')).toBe(true)
            expect(selectedItems.has('five')).toBe(true)

            selectItem('one', shiftEvent)
            expect(selectedItems.size).toBe(3)
            expect(selectedItems.has('one')).toBe(true)
            expect(selectedItems.has('two')).toBe(true)
            expect(selectedItems.has('three')).toBe(true)
            expect(selectedItems.has('four')).toBe(false)
            expect(selectedItems.has('five')).toBe(false)
          })

          it('makes a new selection starting from the same item in the same direction', () => {
            const { selectedItems, selectItem } = useMultiSelect([
              'one',
              'two',
              'three',
              'four',
              'five'
            ])
            selectItem('one', noShiftEvent)
            expect(selectedItems.size).toBe(1)

            selectItem('three', shiftEvent)
            expect(selectedItems.size).toBe(3)

            selectItem('five', shiftEvent)
            expect(selectedItems.size).toBe(5)
            expect(selectedItems.has('one')).toBe(true)
            expect(selectedItems.has('two')).toBe(true)
            expect(selectedItems.has('three')).toBe(true)
            expect(selectedItems.has('four')).toBe(true)
            expect(selectedItems.has('five')).toBe(true)
          })

          it("clears the previously selected items if shift key's selection includes them but then moves away", () => {
            const { selectedItems, selectItem } = useMultiSelect([
              'one',
              'two',
              'three',
              'four',
              'five'
            ])
            selectItem('one', noShiftEvent)
            selectItem('three', noShiftCtrlEvent)

            selectItem('five', shiftEvent)
            expect(selectedItems.size).toBe(4)

            selectItem('one', shiftEvent)
            expect(selectedItems.size).toBe(3)

            selectItem('five', shiftEvent)
            expect(selectedItems.size).toBe(3)
          })
        })
      })
    })

    describe('and a ctrl/cmd key is pressed regardless of shift key', () => {
      const events = [
        new MouseEvent('click', { metaKey: true, shiftKey: false }),
        new MouseEvent('click', { metaKey: true, shiftKey: true }),
        new MouseEvent('click', { ctrlKey: true, shiftKey: false }),
        new MouseEvent('click', { ctrlKey: true, shiftKey: true })
      ]
      events.forEach(event => {
        describe('when the item is already selected', () => {
          it('unselects the item without clearing the selection', () => {
            const { selectedItems, selectItem } = useMultiSelect(['one', 'two'], false, [
              'one',
              'two'
            ])

            selectItem('one', event)
            expect(selectedItems.has('two')).toBe(true)
            expect(selectedItems.has('one')).toBe(false)
          })
        })
        describe('when the item is not yet selected', () => {
          it('adds the item to the selected items', () => {
            const { selectedItems, selectItem } = useMultiSelect(['one', 'two'], false, ['one'])

            selectItem('two', event)
            expect(selectedItems.has('two')).toBe(true)
            expect(selectedItems.has('one')).toBe(true)
          })
        })
      })
    })

    describe('and neither shift nor ctrl/cmd key is pressed', () => {
      const event = new MouseEvent('click', { metaKey: false, ctrlKey: false, shiftKey: false })
      describe('when the item is already selected', () => {
        it('selects the item and clears any other selected items', () => {
          const { selectedItems, selectItem } = useMultiSelect(['one', 'two'], false, [
            'one',
            'two'
          ])

          selectItem('two', event)
          expect(selectedItems.has('two')).toBe(true)
          expect(selectedItems.has('one')).toBe(false)
        })
      })
      describe('when the item is not yet selected', () => {
        it('selects the item and clears any other selected items', () => {
          const { selectedItems, selectItem } = useMultiSelect(['one', 'two'], false, ['one'])

          selectItem('two', event)
          expect(selectedItems.has('two')).toBe(true)
          expect(selectedItems.has('one')).toBe(false)
        })
      })
      describe('and "checkboxMode" is set to true', () => {
        describe('when the item is already selected', () => {
          it('deselects the item and keeps the previous selection', () => {
            const { selectedItems, selectItem } = useMultiSelect(['one', 'two'], true, [
              'one',
              'two'
            ])

            selectItem('two', event)
            expect(selectedItems.has('two')).toBe(false)
            expect(selectedItems.has('one')).toBe(true)
          })
        })
        describe('when the item is not yet selected', () => {
          it('selects the item and keeps the previous selection', () => {
            const { selectedItems, selectItem } = useMultiSelect(['one', 'two'], true, ['one'])

            selectItem('two', event)
            expect(selectedItems.has('two')).toBe(true)
            expect(selectedItems.has('one')).toBe(true)
          })
        })
      })
    })
  })

  describe('when `clearSelection` method is called', () => {
    it('clears all selected items', () => {
      const { selectedItems, clearSelection } = useMultiSelect(['one', 'two'], false, [
        'one',
        'two'
      ])

      clearSelection()
      expect(selectedItems.size).toBe(0)
    })
  })

  describe('when `selectAll` method is called', () => {
    it('selects all items', () => {
      const { selectedItems, selectAll } = useMultiSelect(['one', 'two'])

      selectAll()
      expect(selectedItems.size).toBe(2)
      expect(selectedItems.has('one')).toBe(true)
      expect(selectedItems.has('two')).toBe(true)
    })
  })

  describe('when `items` are a ref and are updated', () => {
    let itemsRef: Ref<string[]>
    beforeEach(() => {
      itemsRef = ref(['one', 'two'])
    })

    it('clears any previous selection', async () => {
      const { selectedItems, selectItem } = useMultiSelect(itemsRef)

      selectItem('one', noShiftEvent)
      expect(selectedItems.size).toBe(1)

      itemsRef.value = ['one', 'two', 'three']

      await nextTick()
      expect(selectedItems.size).toBe(0)
    })
    it('works with new items', async () => {
      const { selectedItems, selectItem } = useMultiSelect(itemsRef)

      itemsRef.value = ['one', 'two', 'three']

      await nextTick()
      expect(selectedItems.size).toBe(0)
      selectItem('three', noShiftEvent)
      expect(selectedItems.size).toBe(1)
      expect(selectedItems.has('three')).toBe(true)
    })
  })
  describe('when `preSelectedItems` are a ref and are updated', () => {
    let preSelectedItemsRef: Ref<string[]>
    beforeEach(() => {
      preSelectedItemsRef = ref(['one'])
    })
    it('updates the selected items with new ones', async () => {
      const { selectedItems } = useMultiSelect(['one', 'two'], false, preSelectedItemsRef)

      expect(selectedItems.has('one')).toBe(true)
      expect(selectedItems.has('two')).toBe(false)
      preSelectedItemsRef.value = ['two']
      await nextTick()
      expect(selectedItems.has('one')).toBe(false)
      expect(selectedItems.has('two')).toBe(true)
    })
    it('clears any manual selection', async () => {
      const { selectedItems, selectItem } = useMultiSelect(
        ['one', 'two', 'three'],
        false,
        preSelectedItemsRef
      )

      selectItem('three', noShiftEvent)
      expect(selectedItems.size).toBe(1)

      preSelectedItemsRef.value = ['two']
      await nextTick()
      expect(selectedItems.size).toBe(1)
      expect(selectedItems.has('one')).toBe(false)
      expect(selectedItems.has('two')).toBe(true)
      expect(selectedItems.has('three')).toBe(false)
    })
  })
})

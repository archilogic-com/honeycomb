import { reactive, watch, unref, Ref, isRef } from 'vue'

export type SelectItemCallback = (itemId: string, event: MouseEvent | KeyboardEvent) => void

export default function useMultiSelect(
  itemsRef: Ref<string[]> | string[],
  checkboxMode: Ref<boolean> | boolean = false,
  preSelectedItemsRef: Ref<string[]> | string[] = []
) {
  // Exposed reactive variable:
  const selectedItems: Set<string> = reactive(new Set())

  // Internal variables:
  let items: string[]
  let temporarySelection: string[]
  let indexByItem: { [key: string]: number }
  let lastIndex: number

  // Internal methods:
  const setIndexByItem = () => {
    indexByItem = items.reduce<Record<string, number>>((indexMap, item, index) => {
      return { ...indexMap, [item]: index }
    }, {})
  }

  const addPreSelection = () => {
    unref(preSelectedItemsRef).forEach(item => {
      selectedItems.add(item)
    })
  }
  const initItems = () => {
    items = unref(itemsRef)
    temporarySelection = []
    lastIndex = -1
  }

  // Initial processing:
  initItems()
  setIndexByItem()
  addPreSelection()

  // Exposed methods:
  const clearSelection = () => {
    selectedItems.clear()
    lastIndex = -1
  }

  const selectAll = () => {
    items.forEach(item => {
      selectedItems.add(item)
    })
  }

  const selectItem: SelectItemCallback = (item, event) => {
    if (event.ctrlKey || event.metaKey) {
      temporarySelection = []
      if (selectedItems.has(item)) {
        selectedItems.delete(item)
      } else {
        selectedItems.add(item)
      }
      lastIndex = indexByItem[item]
    } else if (event.shiftKey) {
      // a trick to remove any text selection that happens when user is pressing shift
      document.getSelection()?.removeAllRanges()

      // cleanup any previous shift selection
      temporarySelection.forEach(item => {
        selectedItems.delete(item)
      })
      temporarySelection = []

      const newIndex = indexByItem[item]
      if (newIndex === undefined) {
        throw new Error('item index not found')
      }
      let from: number
      let to: number

      if (lastIndex < 0) {
        from = 0
        to = newIndex
        lastIndex = newIndex
      } else if (lastIndex <= newIndex) {
        from = lastIndex
        to = newIndex
      } else {
        from = newIndex
        to = lastIndex
      }

      for (let i = from; i <= to; i++) {
        selectedItems.add(items[i])
        temporarySelection.push(items[i])
      }
    } else {
      temporarySelection = []
      if (unref(checkboxMode)) {
        if (selectedItems.has(item)) {
          selectedItems.delete(item)
        } else {
          selectedItems.add(item)
        }
      } else {
        selectedItems.clear()
        selectedItems.add(item)
      }
      lastIndex = indexByItem[item]
    }
  }

  // Watchers:
  if (isRef(itemsRef)) {
    watch(itemsRef, () => {
      clearSelection()
      initItems()
      setIndexByItem()
    })
  }

  if (isRef(preSelectedItemsRef)) {
    watch(preSelectedItemsRef, () => {
      clearSelection()
      initItems()
      addPreSelection()
    })
  }

  return {
    selectedItems,
    selectItem,
    clearSelection,
    selectAll
  }
}

<script lang="ts">
import { defineComponent, ref, onMounted, Ref, PropType } from 'vue'

export default defineComponent({
  name: 'AArrowKeyFocusable',
  props: {
    /**
     * HTML element the component should render as
     */
    as: {
      type: String as PropType<keyof HTMLElementTagNameMap>,
      default: 'div'
    },
    /**
     * navigation with left/right or up/down arrow keys
     * `'horizontal' | 'vertical'`
     */
    direction: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'vertical'
    }
  },
  setup(props) {
    const container: Ref<HTMLElement | null> = ref(null)
    let tabZeroElement: HTMLElement | null = null

    const getNextFocusableElement = (
      node: Element | null | undefined,
      reverse = false
    ): HTMLElement | null => {
      if (!node) {
        return null
      }
      if (node.hasAttribute('tabIndex')) {
        return node as HTMLElement
      }

      return getNextFocusableElement(
        reverse ? node.previousElementSibling : node.nextElementSibling
      )
    }

    onMounted(() => {
      if (container.value?.children) {
        tabZeroElement =
          (Array.from(container.value?.children).find(
            element => element.getAttribute('tabIndex') === '0'
          ) as HTMLElement) || null
      }
      if (!tabZeroElement) {
        tabZeroElement = getNextFocusableElement(container.value?.firstElementChild)
      }
      if (tabZeroElement) {
        tabZeroElement.tabIndex = 0
      }
    })

    const onFocus = async (event: FocusEvent) => {
      // if our saved tabZero element is no longer in the dom, reset it to null
      if (tabZeroElement && !container.value?.contains(tabZeroElement)) {
        tabZeroElement = null
      }
      //if the container receives focus and we don't have a saved tabZero element
      if (!tabZeroElement) {
        // make the first child the tabZero element
        tabZeroElement = getNextFocusableElement(container.value?.firstElementChild)
      }
      if (tabZeroElement) {
        tabZeroElement.tabIndex = 0
        // unless the user is trying to tab out of the container
        // i.e. the element that got blurred is the child
        const blurredElement = event.relatedTarget as HTMLElement
        if (blurredElement?.parentElement !== container.value) {
          // focus the tabZero element
          tabZeroElement.focus()
        }
      }
    }

    const onFocusIn = (event: FocusEvent): void => {
      const targetElement = event.target as HTMLElement
      // if a child element was focused via a click event, save it as our new tabZero element
      if (
        targetElement?.parentElement === container.value &&
        targetElement.hasAttribute('tabIndex')
      ) {
        tabZeroElement = targetElement
        tabZeroElement.tabIndex = 0
      }
    }

    const handleArrowKeys = (event: KeyboardEvent): void => {
      // https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_roving_tabindex
      const verticalKeys = { next: ['Down', 'ArrowDown'], previous: ['Up', 'ArrowUp'] }
      const horizontalKeys = { next: ['Right', 'ArrowRight'], previous: ['Left', 'ArrowLeft'] }
      const arrowKeys = props.direction === 'vertical' ? verticalKeys : horizontalKeys
      const relevantKeys = [...arrowKeys.next, ...arrowKeys.previous, 'Home', 'End']
      if (relevantKeys.includes(event.key) && container.value?.childElementCount) {
        event.preventDefault()
        event.stopPropagation()
        const firstElement = getNextFocusableElement(container.value.firstElementChild)
        const lastElement = getNextFocusableElement(container.value.lastElementChild, true)

        if (tabZeroElement) {
          tabZeroElement.tabIndex = -1
        }

        if (arrowKeys.next.includes(event.key)) {
          tabZeroElement =
            getNextFocusableElement(tabZeroElement?.nextElementSibling) || firstElement
        } else if (arrowKeys.previous.includes(event.key)) {
          tabZeroElement =
            getNextFocusableElement(tabZeroElement?.previousElementSibling, true) || lastElement
        } else if (event.key === 'Home') {
          tabZeroElement = firstElement
        } else if (event.key === 'End') {
          tabZeroElement = lastElement
        } else {
          return
        }
        if (tabZeroElement) {
          tabZeroElement.tabIndex = 0
          tabZeroElement.focus()
        }
      }
    }

    return {
      container,
      handleArrowKeys,
      onFocus,
      onFocusIn
    }
  }
})
</script>
<template>
  <component
    :is="as"
    ref="container"
    class="focus-visible:focus-outline"
    tabindex="0"
    @keydown="handleArrowKeys"
    @focus="onFocus"
    @focusin="onFocusIn">
    <slot></slot>
  </component>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, computed, PropType, onMounted } from 'vue'
import { useElementBounding } from '@vueuse/core'

import AIcon from './Icon.vue'
import ArrowKeyFocusable from './ArrowKeyFocusable.vue'
import { type Shortcut, default as KeyboardShortcut } from './KeyboardShortcut.vue'

export default defineComponent({
  name: 'AAppMenuItem',
  components: { AIcon, ArrowKeyFocusable, KeyboardShortcut },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    open: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    },
    href: {
      type: String,
      default: ''
    },
    role: {
      type: String as PropType<'radio' | 'checkbox' | ''>,
      default: ''
    },
    /**
     * type `string` for shortcut prop is deprecated,
     * use type `Shortcut` or `Shortcut[]` instead to
     */
    shortcut: {
      type: [String, Object, Array] as PropType<string | Shortcut | Shortcut[]>,
      default: ''
    },
    /**
     * extra classes to style the menu/submenu panel
     * useful for setting the panel dimension, e.g. max height
     */
    panelClasses: {
      type: String,
      default: ''
    }
  },
  emits: ['select'],
  setup(props, context) {
    const submenu = ref()
    const menuitem = ref()
    const isSubmenuOpen = ref(false)
    const { right, left, width } = useElementBounding(submenu, {
      windowScroll: false,
      updateTiming: 'next-frame'
    })

    onMounted(async () => {
      if (props.open) {
        await openSubmenu()
      }
    })

    const isSelectable = computed(() => !!props.role)

    const positionSubmenu = () => {
      if (menuitem.value && submenu.value) {
        const itemRect = menuitem.value.getBoundingClientRect()
        const submenuRect = submenu.value.getBoundingClientRect()

        const submenuToBottomDistance = window.innerHeight - submenuRect.bottom
        const topAdjustment = itemRect.top - submenuRect.top
        if (submenuToBottomDistance - topAdjustment <= 0) {
          // move the submenu panel up if it's too long to fit at the bottom of the screen
          // -8px to keep the box shadow visible
          submenu.value.style.top = `${submenuToBottomDistance - 8}px`
        } else {
          // otherwise move the submenu panel down to vertically align with its parent menuitem
          // -8px to keep the box shadow visible
          submenu.value.style.top = `${topAdjustment - 8}px`
        }
      }
    }

    const shouldSubmenuBeLeftPositioned = computed(() => {
      const distanceToRightEdge = window.innerWidth - right.value
      // if the submenu does not fit to the right, move it.
      // nested submenus should move too unless they don't fit to the left
      // (in that case ok to overlap parent menu)
      return (
        distanceToRightEdge <= 2 ||
        (menuitem.value?.parentElement.dataset.leftAlign && left.value - width.value > 2)
      )
    })

    const handleSelection = async (event: MouseEvent | KeyboardEvent) => {
      if (!menuitem.value) return // the menu has been closed
      // ignore all other keys, except for mouse clicks, space, enter and arrow left/right
      if (!('key' in event) || ['Enter', ' ', 'ArrowRight', 'ArrowLeft'].includes(event.key)) {
        event.preventDefault()
        if (context.slots.submenu) {
          if ('key' in event && event.key === 'ArrowLeft') {
            if (event.target !== event.currentTarget) {
              event.stopPropagation()
              closeSubmenu()
            }
          } else {
            if (!submenu.value?.contains(event.target)) {
              event.stopPropagation()
              if (!props.disabled) {
                await openSubmenuAndFocusFirstItem()
              }
            }
          }
        } else {
          if (!('key' in event) || ['Enter', ' '].includes(event.key)) {
            if (props.disabled) {
              // don't close the menu
              event.stopPropagation()
              return
            }
            if (isSelectable.value && 'key' in event && event.key === ' ') {
              // don't close the menu
              event.stopPropagation()
            }

            context.emit('select', event)

            if (props.href) {
              // trigger a click event from the link by keyboard nav
              menuitem.value.querySelector('a').dispatchEvent(
                new MouseEvent('click', {
                  bubbles: false
                })
              )
            }
          }
        }
      }
    }

    const openSubmenu = async () => {
      isSubmenuOpen.value = true
      await nextTick()
      positionSubmenu()
    }

    const openSubmenuAndFocusFirstItem = async () => {
      // for mysterious reasons `await openSubmenu()` breaks a bunch of tests, and this doesn't
      openSubmenu()
      await nextTick()
      submenu.value?.firstElementChild.focus({ preventScroll: true })
    }

    const closeSubmenu = () => {
      isSubmenuOpen.value = false
      menuitem.value?.focus({ preventScroll: true })
    }

    const onMouseEnter = async () => {
      menuitem.value?.focus({ preventScroll: true })
      if (!props.disabled && context.slots.submenu && !isSubmenuOpen.value) {
        await openSubmenu()
      }
    }

    const onFocusOut = (event: FocusEvent) => {
      if (!menuitem.value?.contains(event.relatedTarget) && context.slots.submenu) {
        isSubmenuOpen.value = false
      }
    }

    const ariaRole = computed(() => {
      if (props.href) {
        return 'presentation'
      }
      return `menuitem${props.role}`
    })

    return {
      isSubmenuOpen,
      handleSelection,
      onMouseEnter,
      onFocusOut,
      submenu,
      menuitem,
      isSelectable,
      ariaRole,
      shouldSubmenuBeLeftPositioned
    }
  }
})
</script>

<template>
  <li
    ref="menuitem"
    class="static body-sm focus:bg-athens focus-visible:outline-none"
    :class="[
      disabled
        ? 'cursor-not-allowed text-warsaw'
        : 'cursor-pointer text-newyork focus-within:bg-athens'
    ]"
    tabindex="-1"
    :aria-disabled="disabled"
    :role="ariaRole"
    :aria-haspopup="!!$slots.submenu ? 'true' : undefined"
    :aria-expanded="!!$slots.submenu ? isSubmenuOpen : undefined"
    :aria-checked="isSelectable ? selected : undefined"
    @keydown="handleSelection"
    @click="handleSelection"
    @mouseenter="onMouseEnter"
    @focusout="onFocusOut">
    <component
      :is="href ? 'a' : 'div'"
      :href="href"
      :role="href ? 'menuitem' : undefined"
      :target="$attrs.target"
      class="flex h-8 w-full items-center">
      <div class="ml-2 flex w-4 shrink-0 items-center justify-center">
        <slot name="icon">
          <a-icon
            v-if="isSelectable"
            :class="{ hidden: !selected }"
            name="Check"
            size="sm"></a-icon>
        </slot>
      </div>
      <div class="flex-1 whitespace-nowrap px-2 text-left">
        <slot></slot>
      </div>
      <div class="mr-2 flex w-fit shrink-0 items-center gap-2">
        <slot name="extra"></slot>
        <KeyboardShortcut
          v-if="shortcut"
          :class="disabled && '!text-warsaw'"
          variant="subtle"
          :shortcut="
            typeof shortcut === 'string' ? { keySequence: shortcut } : shortcut
          "></KeyboardShortcut>
      </div>
      <template v-if="$slots.submenu">
        <a-icon name="MenuChevronRight" size="other" class="mr-2"></a-icon>
        <div
          v-if="isSubmenuOpen"
          ref="submenu"
          class="absolute top-0 z-10"
          :class="[
            shouldSubmenuBeLeftPositioned ? 'right-full -mr-[6px] pr-2' : 'left-full -ml-[6px] pl-2'
          ]">
          <arrow-key-focusable
            as="ul"
            role="menu"
            :data-left-align="shouldSubmenuBeLeftPositioned"
            class="a-menu-panel overflow-y-auto overflow-x-visible"
            :class="panelClasses">
            <slot name="submenu"></slot>
          </arrow-key-focusable>
        </div>
      </template>
    </component>
  </li>
</template>

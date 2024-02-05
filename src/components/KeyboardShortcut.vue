<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { isMac } from '@archilogic/toolbox'

type ShortcutModifier =
  | 'alt' // Alt on Windows, Option ⌥ on Mac
  | 'ctrl'
  | 'meta' // Windows Key on Windows, Command ⌘ on Mac
  | 'shift'

type ShortcutMouseEvent = 'click' | 'drag' | 'double-click'

export type Shortcut =
  | { modifiers: ShortcutModifier[] }
  | { keySequence: string }
  | { modifiers: ShortcutModifier[]; keySequence: string }
  | {
      modifiers: ShortcutModifier[]
      mouseEvent: ShortcutMouseEvent
    }
  | {
      mouseEvent: ShortcutMouseEvent
    }

const getShortcutKeys = (shortcut: Shortcut) => {
  const keys = []
  if ('modifiers' in shortcut) {
    if (shortcut.modifiers.includes('alt')) {
      keys.push(isMac ? '⌥' : 'Alt')
    }
    if (shortcut.modifiers.includes('meta')) {
      keys.push(isMac ? '⌘' : '⊞')
    }
    if (shortcut.modifiers.includes('ctrl')) {
      keys.push('Ctrl')
    }
    if (shortcut.modifiers.includes('shift')) {
      keys.push('⇧')
    }
  }
  if ('keySequence' in shortcut) {
    switch (shortcut.keySequence) {
      case 'delete':
        keys.push('Delete')
        break
      case 'backspace':
        keys.push('⌫')
        break
      case ' ':
        keys.push('Space')
        break
      case 'escape':
        keys.push('Esc')
        break
      case 'enter':
        keys.push('↵')
        break
      case 'alt':
        keys.push(isMac ? '⌥' : 'Alt')
        break
      default:
        keys.push(shortcut.keySequence.toUpperCase())
        break
    }
  }
  if ('mouseEvent' in shortcut) {
    keys.push(shortcut.mouseEvent)
  }
  return keys
}

export default defineComponent({
  name: 'AKeyboardShortcut',
  props: {
    shortcut: {
      type: [Object, Array] as PropType<Shortcut | Shortcut[]>,
      required: true
    },
    variant: {
      type: String as PropType<'default' | 'subtle'>,
      default: 'default'
    }
  },
  setup(props) {
    const shortcuts = computed(() => {
      if (Array.isArray(props.shortcut)) {
        return props.shortcut.map(shortcut => ({
          keys: getShortcutKeys(shortcut)
        }))
      } else {
        return [{ keys: getShortcutKeys(props.shortcut) }]
      }
    })

    return {
      shortcuts
    }
  }
})
</script>
<template>
  <div class="flex items-center gap-2">
    <template v-for="(item, index) in shortcuts" :key="'shortcut' + index">
      <div :class="{ 'flex gap-[2px]': item.keys.length > 1 }">
        <template v-for="key in item.keys" :key="key">
          <kbd
            class="text-stone body-xs-600"
            :class="{ 'px-1 py-[2px] bg-athens rounded-md': variant === 'default' }">
            {{ key }}
          </kbd>
        </template>
      </div>
      <div v-if="index < shortcuts.length - 1" :key="'separator' + index" class="body-xs-400">
        or
      </div>
    </template>
  </div>
</template>

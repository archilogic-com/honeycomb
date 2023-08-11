<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import AIcon from './Icon.vue'
import AColorCircle from './ColorCircle.vue'
import type { Colors } from '../colors'

export default defineComponent({
  name: 'ATag',
  components: { AIcon, AColorCircle },
  inheritAttrs: false,
  props: {
    /**
     * content of the tag
     */
    content: {
      type: String,
      default: ''
    },
    /**
     * whether the tag should render an 'x' button that emits a "remove" event on click
     */
    removable: {
      type: Boolean,
      default: false
    },
    /**
     * produces an optional color circle
     */
    color: {
      type: String as PropType<Colors>,
      default: ''
    },
    /**
     * an accessible label for the "remove" button
     */
    removeLabel: {
      type: String,
      default: 'Remove'
    }
  },
  emits: ['remove'],
  setup(props, context) {
    const tagName = computed(() => {
      if (attrs.href) {
        return 'a'
      }
      if (attrs.onClick) {
        return 'button'
      }
      return 'div'
    })

    const { class: classes, ...attrs } = context.attrs
    return { classes, attrs, tagName }
  }
})
</script>
<template>
  <div class="group relative inline-block max-w-full" :class="classes">
    <component
      v-bind="attrs"
      :is="tagName"
      class="flex h-6 items-center overflow-hidden rounded-full border border-gray bg-whisper text-navy body-xs-400"
      :class="[
        removable && tagName !== 'div' && 'focus-visible:pl-[7px] focus-visible:pr-[27px]', // adjust 1px to make space focus-border outline
        removable ? 'pl-2 pr-[28px] group-hover:border-warsaw' : 'px-2',
        tagName !== 'div' && 'hover:border-warsaw focus-visible:px-[7px] focus-visible:focus-border'
      ]">
      <a-color-circle v-if="color" :color="color" class="mr-1" />
      <span class="truncate">
        <slot>{{ content }}</slot>
      </span>
    </component>
    <button
      v-if="removable"
      class="absolute right-0 top-0 h-full rounded-br-full rounded-tr-full px-1 hover:bg-stone16 focus-visible:focus-shadow"
      :aria-label="removeLabel"
      :disabled="!!attrs.disabled"
      @click="$emit('remove', $event)">
      <AIcon name="close" size="sm"></AIcon>
    </button>
  </div>
</template>

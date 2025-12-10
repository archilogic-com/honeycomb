<script lang="ts">
import { defineComponent, PropType, Component } from 'vue'

type ClassValue = string | string[] | Record<string, boolean>

export default defineComponent({
  name: 'APanel',
  props: {
    /**
     * panel heading
     * Use the corresponding `#title` slot if you need complex markup.
     */
    title: {
      type: String,
      default: ''
    },
    as: {
      type: [Object, String] as PropType<Component | keyof HTMLElementTagNameMap>,
      default: 'div'
    },
    /**
     * Custom classes for internal containers. Merged with default classes.
     * - `title`: merged with (min-h-10 px-6 pt-2 heading-sm)
     * - `body`: merged with (overflow-auto px-6 py-4 body-md)
     * - `actions`: merged with (mt-auto flex h-16 items-center gap-2 rounded-b border-t border-gray bg-athens px-6 py-3)
     */
    classes: {
      type: Object as PropType<{
        title?: ClassValue
        body?: ClassValue
        actions?: ClassValue
      }>,
      default: () => ({})
    }
  }
})
</script>
<template>
  <div class="a-panel-lg flex flex-col whitespace-pre-line rounded bg-white">
    <div v-if="$slots.title || title" class="min-h-10 px-6 pt-2 heading-sm" :class="classes.title">
      <!--
        @slot #title
        For simple strings, use the `title` prop.
        Use the slot to render a panel title with custom markup
      -->
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div class="overflow-auto px-6 py-4 body-md" :class="classes.body">
      <!--
        @slot #body
        This is a padded container with typography styles 
      -->
      <slot name="body"></slot>
    </div>
    <div
      v-if="$slots.actions"
      class="mt-auto flex h-16 items-center gap-2 rounded-b border-t border-gray bg-athens px-6 py-3"
      :class="classes.actions">
      <!--
          @slot #actions
          Use the slot to provide buttons for user actions.
          Recommended to use `a-button` size="lg", variant="primary/subtle"
        -->
      <slot name="actions"></slot>
    </div>
  </div>
</template>

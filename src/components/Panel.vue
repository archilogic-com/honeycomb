<script lang="ts">
import { defineComponent, PropType, Component } from 'vue'

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
    }
  }
})
</script>
<template>
  <div class="a-panel-lg flex flex-col whitespace-pre-line rounded bg-white">
    <div v-if="$slots.title || title" class="min-h-10 px-6 pt-2 heading-sm">
      <!--
        @slot #title
        For simple strings, use the `title` prop.
        Use the slot to render a panel title with custom markup
      -->
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div class="overflow-auto px-6 py-4 body-md">
      <!--
        @slot #body
        This is a padded container with typography styles 
      -->
      <slot name="body"></slot>
    </div>
    <div
      v-if="$slots.actions"
      class="mt-auto flex h-16 items-center gap-2 rounded-b border-t border-gray bg-athens px-6 py-3">
      <!--
          @slot #actions
          Use the slot to provide buttons for user actions.
          Recommended to use `a-button` size="lg", variant="primary/subtle"
        -->
      <slot name="actions"></slot>
    </div>
  </div>
</template>

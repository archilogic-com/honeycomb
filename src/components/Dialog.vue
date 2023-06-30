<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import {
  Dialog as HlDialog,
  DialogPanel as HlDialogPanel,
  DialogTitle as HlDialogTitle
} from '@headlessui/vue'

import AButton from './Button.vue'
import APanel from './Panel.vue'

export default defineComponent({
  name: 'ADialog',
  components: { HlDialog, HlDialogPanel, HlDialogTitle, AButton, APanel },
  props: {
    /**
     * whether the dimmed overlay should be shown
     */
    overlay: {
      type: Boolean,
      default: true
    },
    /**
     * dialog heading. Rendered as `<h2>` by default.
     * Use the corresponding `#title` slot if you need complex markup or a different level heading.
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * vertical alignment of the dialog.
     *
     * `top` (default), `center` or `bottom`
     */
    position: {
      type: String as PropType<'top' | 'center' | 'bottom'>,
      default: 'top'
    }
  },
  emits: ['close'],
  setup(props, context) {
    const usesPanel = computed(
      () => context.slots.actions || context.slots.body || context.slots.title || props.title
    )
    return {
      HlDialogPanel,
      usesPanel
    }
  }
})
</script>
<template>
  <HlDialog class="fixed inset-0 z-50" @close="$emit('close')">
    <div class="fixed inset-0" :class="overlay ? 'bg-stone16' : 'bg-transparent'" />
    <div
      class="fixed inset-0 flex flex-col items-center"
      :class="{
        'justify-start': position === 'top',
        'justify-center': position === 'center',
        'justify-end': position === 'bottom'
      }">
      <HlDialogPanel
        v-if="!usesPanel"
        class="a-panel-lg m-[5rem] min-w-[20rem] overflow-auto rounded-lg">
        <!--
            @slot #default
            Styling-free white panel with more rounded corners and no default padding or typography styles
          -->
        <slot></slot>
      </HlDialogPanel>
      <HlDialogPanel v-else class="contents">
        <APanel class="m-[5rem] min-w-[20rem] overflow-auto">
          <!-- this snippet passes up all the wrapper component's slots -->
          <template v-for="(_, slot) in $slots" #[slot]="scope">
            <slot :name="slot" v-bind="scope || {}" />
          </template>
          <template #title>
            <div class="relative flex justify-between pr-6">
              <HlDialogTitle>
                <slot name="title">{{ title }}</slot>
              </HlDialogTitle>
              <AButton
                icon="Close"
                variant="subtle"
                class="absolute -right-4 top-0 text-stone"
                label="Close"
                @click="$emit('close')"></AButton>
            </div>
          </template>
        </APanel>
      </HlDialogPanel>
    </div>
  </HlDialog>
</template>

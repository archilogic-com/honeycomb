<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import AIcon from './Icon.vue'

export type AvatarSize = 'md' | 'lg'

export default defineComponent({
  name: 'AAvatar',
  components: { AIcon },
  props: {
    /**
     * size of the avatar
     *
     * `md` or `lg`
     */
    size: {
      type: String as PropType<AvatarSize>,
      default: 'md'
    },
    /**
     * the label for the avatar
     *
     * the first letter from the label will be displayed
     */
    label: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const firstLabelLetter = computed(() => props.label?.[0])
    return { firstLabelLetter }
  }
})
</script>
<template>
  <div
    :class="size === 'md' ? 'h-8 w-8' : 'h-10 w-10'"
    role="avatar"
    class="overflow-hidden text-ellipsis rounded-full border border-gray bg-whisper">
    <div
      class="flex h-full items-center justify-center rounded-full border border-white bg-whisper text-navy">
      <slot>
        <span v-if="firstLabelLetter" class="capitalize body-sm">{{ firstLabelLetter }}</span>
        <a-icon v-else name="User" size="md" />
      </slot>
    </div>
  </div>
</template>

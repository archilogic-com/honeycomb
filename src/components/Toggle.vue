<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'AToggle',
  props: {
    /**
     * id of the element containing the labelling text
     */
    labelId: {
      type: String,
      required: true
    },
    /**
     * the prop modelValue is required to use [v-model](https://vuejs.org/guide/components/events.html#usage-with-v-model) with a component
     */
    modelValue: {
      type: [Boolean, String] as PropType<boolean | 'mixed'>,
      required: true
    }
  },
  emits: ['update:modelValue'],
  computed: {
    backgroundClass() {
      if (this.modelValue === 'mixed') {
        return 'before:bg-mediumblue hover:before:bg-blueribbon before:border-r-[15px] before:border-warsaw hover:before:opacity-75'
      }
      if (this.modelValue) {
        return 'before:bg-mediumblue hover:before:bg-blueribbon'
      } else {
        return 'before:bg-warsaw  hover:before:opacity-75'
      }
    },
    positionClass() {
      if (this.modelValue === 'mixed') {
        return ''
      }
      return this.modelValue ? 'after:translate-x-[6px]' : 'after:-translate-x-[6px]'
    }
  },
  methods: {
    emitChange() {
      this.$emit('update:modelValue', !this.modelValue)
    }
  }
})
</script>
<template>
  <button
    :aria-pressed="modelValue"
    :aria-labelledby="labelId"
    class="relative flex h-8 w-10 items-center justify-center before:inline-block before:h-[18px] before:w-[30px] before:shrink-0 before:rounded-full before:transition-all before:ease-in-out after:absolute after:top-[10px] after:inline-block after:h-3 after:w-3 after:rounded-full after:bg-white after:transition-all after:ease-in-out focus-visible:focus-none focus-visible:before:focus-outline disabled:before:opacity-[.16] disabled:cursor-not-allowed"
    :class="[backgroundClass, positionClass]"
    @click="emitChange"></button>
</template>

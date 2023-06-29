<script lang="ts">
import { defineComponent } from 'vue'

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
      type: Boolean,
      required: true
    }
  },
  emits: ['update:modelValue'],
  computed: {
    backgroundClass() {
      if (this.modelValue) {
        return this.$attrs.disabled
          ? 'before:bg-mediumblue before:opacity-[.16] cursor-not-allowed'
          : 'before:bg-mediumblue hover:before:bg-blueribbon'
      } else {
        return this.$attrs.disabled
          ? 'before:bg-stone16 cursor-not-allowed'
          : 'before:bg-warsaw  hover:before:opacity-75'
      }
    },
    positionClass() {
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
    class="relative flex h-8 w-10 items-center justify-center before:inline-block before:h-[18px] before:w-[30px] before:shrink-0 before:rounded-full before:transition-all before:ease-in-out after:absolute after:top-[10px] after:inline-block after:h-3 after:w-3 after:rounded-full after:bg-white after:transition-all after:ease-in-out focus-visible:focus-none focus-visible:before:focus-shadow"
    :class="[backgroundClass, positionClass]"
    @click="emitChange"></button>
</template>

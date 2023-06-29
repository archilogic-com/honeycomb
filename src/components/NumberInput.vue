<script lang="ts">
import { defineComponent, ref } from 'vue'
import AInput from './internal/Input.vue'
import StepDownArrow from './internal/StepDownArrow.vue'
import StepUpArrow from './internal/StepUpArrow.vue'

export default defineComponent({
  name: 'ANumberInput',
  components: { AInput, StepUpArrow, StepDownArrow },
  inheritAttrs: false,
  emits: ['update:model-value'],
  setup(props, { expose, emit }) {
    const inputRef = ref()

    const updateValue = (newValue: number) => {
      emit('update:model-value', newValue)
    }

    const stepUp = () => {
      const inputElement = inputRef.value?.el
      if (inputElement) {
        inputElement.stepUp()
        updateValue(inputElement.value)
      }
    }

    const stepDown = () => {
      const inputElement = inputRef.value?.el
      if (inputElement) {
        inputElement.stepDown()
        updateValue(inputElement.value)
      }
    }

    expose({
      inputRef: inputRef.value?.inputRef,
      el: inputRef.value?.inputRef,
      $el: inputRef.value?.inputRef
    })

    return { stepUp, stepDown, inputRef, updateValue }
  }
})
</script>
<template>
  <div class="group relative">
    <AInput
      v-bind="$attrs"
      ref="inputRef"
      type="number"
      class="a-number-input enabled:group-hover:a-text-input-hover"
      @update:model-value="updateValue" />
    <div
      class="invisible absolute bottom-0 right-0 top-0 flex flex-col justify-center text-warsaw"
      :class="!$attrs.disabled && 'group-focus-within:visible group-hover:visible'">
      <button
        class="group/up p-2 pb-1 hover:text-stone focus:outline-none"
        tabindex="-1"
        aria-label="Step Up"
        @click="stepUp">
        <StepUpArrow class="group-active/up:translate-y-[-2px]" />
      </button>
      <button
        class="group/down p-2 pt-1 hover:text-stone focus:outline-none"
        tabindex="-1"
        aria-label="Step Down"
        @click="stepDown">
        <StepDownArrow class="group-active/down:translate-y-[2px]" />
      </button>
    </div>
  </div>
</template>

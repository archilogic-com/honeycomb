<script lang="ts">
import { defineComponent, ref } from 'vue'
import AInput from './internal/Input.vue'
import StepDownArrow from './internal/StepDownArrow.vue'
import StepUpArrow from './internal/StepUpArrow.vue'

export default defineComponent({
  name: 'ANumberInput',
  components: { AInput, StepUpArrow, StepDownArrow },
  inheritAttrs: false,
  props: {
    /**
     * works the same as the HTML step attribute, default `1`
     */
    step: {
      type: Number,
      default: 1
    },
    /** if provided, can be used to change the number input value
     * with up/down arrow keys or step buttons while holding Shift + Alt */
    smallStep: {
      type: Number,
      default: undefined
    },
    /** if provided, can be used to change the number input value
     * with up/down arrow keys or step buttons while holding Shift  */
    bigStep: {
      type: Number,
      default: undefined
    }
  },
  emits: ['update:model-value', 'update:by-step'],
  setup(props, { expose, emit }) {
    const inputRef = ref()

    const emitUpdateValue = (newValue: number) => {
      emit('update:model-value', newValue)
    }

    const emitUpdateByStep = (newValue: number) => {
      emit('update:by-step', newValue)
    }

    const useStep = (event: PointerEvent | KeyboardEvent, operation: 'up' | 'down') => {
      const inputElement = inputRef.value?.el
      if (inputElement) {
        let step = props.step
        if (event.shiftKey && event.altKey && props.smallStep) {
          step = props.smallStep
        } else if (event.shiftKey && props.bigStep) {
          step = props.bigStep
        }
        inputElement.step = step
        if (operation === 'up') {
          inputElement.stepUp()
        } else {
          inputElement.stepDown()
        }
        emitUpdateValue(inputElement.value)
        emitUpdateByStep(inputElement.value)
      }
    }

    const stepUp = (event: PointerEvent | KeyboardEvent) => {
      useStep(event, 'up')
    }

    const stepDown = (event: PointerEvent | KeyboardEvent) => {
      useStep(event, 'down')
    }

    expose({
      inputRef: inputRef.value?.inputRef,
      el: inputRef.value?.inputRef,
      $el: inputRef.value?.inputRef
    })

    return { stepUp, stepDown, inputRef, emitUpdateValue }
  }
})
</script>
<template>
  <div class="group relative">
    <AInput
      v-bind="$attrs"
      ref="inputRef"
      :step="step"
      type="number"
      class="a-number-input group-hover:a-text-input-hover"
      @keydown.up.prevent="stepUp"
      @keydown.down.prevent="stepDown"
      @update:model-value="emitUpdateValue" />
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

<script setup lang="ts">
import { ref, computed, useAttrs } from 'vue'
import StepDownArrow from './internal/StepDownArrow.vue'
import StepUpArrow from './internal/StepUpArrow.vue'

export interface Props {
  /**
   * the size of the input field
   */
  size?: 'sm' | 'md'
  /**
   * whether the input value is valid
   */
  invalid?: boolean
  /**
   * how the input is displayed when not focused
   */
  variant?: 'subtle' | 'default'
  /**
   * placeholder string
   */
  placeholder?: string
  /**
   * works the same as the HTML step attribute, default `1`
   */
  step?: number | string
  /** if provided, can be used to change the number input value
   * with up/down arrow keys or step buttons while holding Shift + Alt */
  smallStep?: number | string
  /** if provided, can be used to change the number input value
   * with up/down arrow keys or step buttons while holding Shift  */
  bigStep?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'sm',
  invalid: false,
  variant: 'default',
  placeholder: '',
  step: 1,
  smallStep: undefined,
  bigStep: undefined
})

const modelValue = defineModel<number>()
const emit = defineEmits<{
  'update:by-step': [value: number]
}>()

const attrs = useAttrs()
const inputRef = ref<HTMLInputElement | null>(null)

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.value === '') {
    modelValue.value = undefined
  } else {
    modelValue.value = target.valueAsNumber
  }
}

const selectValue = () => {
  if (props.size === 'sm' && inputRef.value) {
    inputRef.value.select()
  }
}

const placeholderText = computed(() => {
  if (!props.placeholder && props.variant === 'subtle') {
    if (attrs.type) {
      return `Add ${attrs.type} value`
    }
    return 'Add value'
  }
  return props.placeholder
})

const variantClasses = computed(() => {
  // invalid (error) state
  if (props.invalid && !attrs.disabled) {
    return 'a-text-input--invalid'
  }
  // subtle display variant
  if (props.variant === 'subtle') {
    return 'a-text-input--subtle'
  }
  // default display variant
  return 'a-text-input--default'
})

const emitUpdateByStep = (newValue: number) => {
  emit('update:by-step', newValue)
}

const useStep = (event: MouseEvent | KeyboardEvent, operation: 'up' | 'down') => {
  if (inputRef.value) {
    let step = props.step
    if (event.shiftKey && event.altKey && props.smallStep) {
      step = props.smallStep
    } else if (event.shiftKey && props.bigStep) {
      step = props.bigStep
    }
    inputRef.value.step = step.toString()
    if (operation === 'up') {
      inputRef.value.stepUp()
    } else {
      inputRef.value.stepDown()
    }
    modelValue.value = inputRef.value.valueAsNumber
    emitUpdateByStep(inputRef.value.valueAsNumber)
  }
}

const stepUp = (event: MouseEvent | KeyboardEvent) => {
  useStep(event, 'up')
}

const stepDown = (event: MouseEvent | KeyboardEvent) => {
  useStep(event, 'down')
}

defineExpose({
  inputRef,
  el: inputRef,
  $el: inputRef
})
</script>

<template>
  <div class="group relative">
    <input
      ref="inputRef"
      type="number"
      class="a-text-input a-number-input group-hover:a-text-input-hover"
      :class="[variantClasses, size === 'md' ? 'a-text-input--md' : 'a-text-input--sm']"
      :value="modelValue"
      :placeholder="placeholderText"
      :aria-invalid="invalid"
      :step="step"
      v-bind="$attrs"
      @input="updateValue"
      @click="selectValue"
      @keydown.up.prevent="stepUp"
      @keydown.down.prevent="stepDown" />
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

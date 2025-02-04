<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue'
import StepDownArrow from './internal/StepDownArrow.vue'
import StepUpArrow from './internal/StepUpArrow.vue'

export default defineComponent({
  name: 'ANumberInput',
  components: { StepUpArrow, StepDownArrow },
  inheritAttrs: false,
  props: {
    /**
     * the prop modelValue is required to use v-model
     */
    modelValue: {
      type: [Number, String],
      default: undefined
    },
    /**
     * the size of the input field
     */
    size: {
      type: String as PropType<'sm' | 'md'>,
      default: 'sm'
    },
    /**
     * whether the input value is valid
     */
    invalid: {
      type: Boolean,
      default: false
    },
    /**
     * how the input is displayed when not focused
     */
    variant: {
      type: String as PropType<'subtle' | 'default'>,
      default: 'default'
    },
    /**
     * placeholder string
     */
    placeholder: {
      type: String,
      default: ''
    },
    /**
     * works the same as the HTML step attribute, default `1`
     */
    step: {
      type: [Number, String],
      default: 1
    },
    /** if provided, can be used to change the number input value
     * with up/down arrow keys or step buttons while holding Shift + Alt */
    smallStep: {
      type: [Number, String],
      default: undefined
    },
    /** if provided, can be used to change the number input value
     * with up/down arrow keys or step buttons while holding Shift  */
    bigStep: {
      type: [Number, String],
      default: undefined
    }
  },
  emits: ['update:model-value', 'update:by-step'],
  setup(props, { emit, expose, attrs }) {
    const inputRef = ref<HTMLInputElement | null>(null)

    const updateValue = (event: Event) => {
      const target = event.target as HTMLInputElement
      emit('update:model-value', target.valueAsNumber)
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
        emit('update:model-value', inputRef.value.valueAsNumber)
        emitUpdateByStep(inputRef.value.valueAsNumber)
      }
    }

    const stepUp = (event: MouseEvent | KeyboardEvent) => {
      useStep(event, 'up')
    }

    const stepDown = (event: MouseEvent | KeyboardEvent) => {
      useStep(event, 'down')
    }

    expose({
      inputRef,
      el: inputRef,
      $el: inputRef
    })

    return {
      stepUp,
      stepDown,
      inputRef,
      updateValue,
      selectValue,
      placeholderText,
      variantClasses
    }
  }
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

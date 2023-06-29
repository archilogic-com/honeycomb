<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue'

export default defineComponent({
  name: 'AInput',
  props: {
    /**
     * the prop modelValue is required to use [v-model](https://vuejs.org/guide/components/events.html#usage-with-v-model) with a component
     */
    modelValue: {
      type: [String, Number],
      default: ''
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
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit, expose, attrs }) {
    const inputRef = ref(null)
    const updateValue = (event: Event) => {
      const target = event.target as HTMLInputElement
      emit('update:modelValue', target.value)
    }
    const selectValue = () => {
      if (props.size === 'sm' && inputRef.value) {
        const element = inputRef.value as HTMLInputElement
        element.select()
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

    expose({ inputRef, el: inputRef, $el: inputRef })

    return { updateValue, selectValue, inputRef, placeholderText }
  },
  computed: {
    variantClasses() {
      // invalid (error) state
      if (this.invalid && !this.$attrs.disabled) {
        return 'a-text-input--invalid'
      }
      // subtle display variant
      if (this.variant === 'subtle') {
        return 'a-text-input--subtle'
      }
      // default display variant
      return 'a-text-input--default'
    }
  }
})
</script>
<template>
  <input
    ref="inputRef"
    type="number"
    class="a-text-input"
    :class="[variantClasses, size === 'md' ? 'a-text-input--md' : 'a-text-input--sm']"
    :value="modelValue"
    :placeholder="placeholderText"
    :aria-invalid="invalid"
    @input="updateValue"
    @click="selectValue" />
</template>

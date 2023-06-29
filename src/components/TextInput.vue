<script lang="ts">
import { defineComponent, PropType, ref, computed, HTMLAttributes, StyleValue } from 'vue'

export default defineComponent({
  name: 'ATextInput',
  inheritAttrs: false,
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
     * a subset of allowed type attributes for the input element
     */
    type: {
      type: String as PropType<'text' | 'email' | 'password' | 'url' | 'search' | 'multiline'>,
      default: 'text'
    },
    /**
     * whether the input value is valid
     */
    valid: {
      type: Boolean,
      default: true
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

    const placeholderText =
      props.variant === 'subtle' && !props.placeholder ? 'Add text value' : props.placeholder

    expose({ inputRef, el: inputRef, $el: inputRef })

    const charactersLeft = computed(() => {
      if (attrs.maxlength) {
        const maxLength = Number(attrs.maxlength)
        const currentLength = String(props.modelValue).length

        return maxLength - currentLength
      }
      return null
    })

    return { updateValue, selectValue, inputRef, placeholderText, charactersLeft }
  },
  computed: {
    variantClasses() {
      // invalid (error) state
      if (!this.valid && !this.$attrs.disabled) {
        return 'a-text-input--invalid'
      }
      // subtle display variant
      if (this.variant === 'subtle') {
        return 'a-text-input--subtle'
      }
      // default display variant
      return 'a-text-input--default'
    },
    sizeClasses() {
      if (this.type !== 'multiline') {
        return this.size === 'md' ? 'a-text-input--md' : 'a-text-input--sm'
      } else {
        if (this.size === 'md') {
          return `${
            this.variant === 'subtle' ? 'min-h-10' : 'min-h-[6.5rem]'
          } h-auto body-lg placeholder:body-lg'`
        } else {
          return `${
            this.variant === 'subtle' ? 'min-h-8' : 'min-h-16'
          } h-auto body-sm placeholder:body-sm'`
        }
      }
    },
    allClasses() {
      return [
        this.variantClasses,
        this.sizeClasses,
        this.type === 'multiline' && 'resize-none grid-area-cover break-anywhere',
        'a-text-input'
      ]
    },
    hiddenDivAttributes(): HTMLAttributes {
      return { class: this.$attrs.class, style: this.$attrs.style as StyleValue }
    }
  }
})
</script>
<template>
  <div :class="{ grid: type === 'multiline' }" class="group relative">
    <div
      v-if="type === 'multiline'"
      v-bind="hiddenDivAttributes"
      aria-hidden="true"
      class="invisible whitespace-pre-wrap"
      :class="allClasses">
      <!-- an extra space here prevents some weird vertical scrolling -->
      {{ modelValue + ' ' }}
    </div>
    <component
      :is="type === 'multiline' ? 'textarea' : 'input'"
      ref="inputRef"
      rows="1"
      :value="modelValue"
      v-bind="$attrs"
      :placeholder="placeholderText"
      :type="type"
      :class="allClasses"
      @input="updateValue"
      @click="selectValue" />
    <div
      v-if="$attrs.maxlength"
      :class="size === 'sm' ? 'body-xs' : 'py-1 body-sm'"
      class="invisible absolute bottom-full right-0 text-stone group-focus-within:visible">
      {{ charactersLeft }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import AIcon from './Icon.vue'

export type SwitcherOption = {
  label: string
  value: string
  disabled?: boolean
  icon?: string
}

export default defineComponent({
  name: 'ASwitcher',
  components: {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
    AIcon
  },
  props: {
    modelValue: {
      type: String,
      required: true
    },
    options: {
      type: Array as PropType<SwitcherOption[]>,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    raised: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const model = computed({
      get: () => {
        return props.modelValue
      },
      set: value => {
        emit('update:modelValue', value)
      }
    })
    return {
      model
    }
  }
})
</script>
<template>
  <RadioGroup
    v-model="model"
    class="p-[2px] rounded bg-whisper flex max-w-fit gap-1"
    :class="{ 'shadow-sm': raised }"
    :disabled="disabled">
    <RadioGroupLabel class="sr-only">{{ label }}</RadioGroupLabel>
    <RadioGroupOption
      v-for="option in options"
      :key="option.value"
      v-slot="{ checked }"
      :value="option.value"
      :disabled="option.disabled || disabled"
      class="focus-visible:focus-outline flex h-8 rounded transition-colors duration-500 ease-out cursor-pointer">
      <div
        class="flex items-center px-3 py-1 rounded active:bg-zurich48 active:text-mediumblue"
        :class="{
          'text-mediumblue bg-zurich': checked,
          'hover:bg-gray active:bg-zurich48': !checked && !option.disabled && !disabled,
          'opacity-40 cursor-not-allowed': option.disabled || disabled
        }"
        :aria-label="option.icon ? option.label : undefined"
        :title="option.icon ? option.label : undefined">
        <slot :name="option.value">
          <a-icon v-if="option.icon" :name="option.icon" size="sm"></a-icon>
          <template v-else>
            {{ option.label }}
          </template>
        </slot>
      </div>
    </RadioGroupOption>
  </RadioGroup>
</template>

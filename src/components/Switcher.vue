<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'

export default defineComponent({
  name: 'ASwitcher',
  components: {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption
  },
  props: {
    modelValue: {
      type: String,
      required: true
    },
    options: {
      type: Array as PropType<{ label: string; value: string; disabled?: boolean }[]>,
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
    class="p-1 rounded bg-whisper flex max-w-fit gap-1 cursor-pointer"
    :class="{ 'shadow-sm': raised, 'opacity-40 cursor-not-allowed': disabled }"
    :disabled="disabled">
    <RadioGroupLabel class="sr-only">{{ label }}</RadioGroupLabel>
    <RadioGroupOption
      v-for="option in options"
      :key="option.value"
      v-slot="{ checked }"
      :value="option.value"
      :disabled="option.disabled"
      class="focus-visible:focus-outline flex rounded transition-colors duration-500 ease-out">
      <div
        class="flex px-3 py-1 rounded active:bg-zurich48 active:text-mediumblue"
        :class="{
          'text-mediumblue bg-zurich': checked,
          'hover:bg-gray': !checked,
          'opacity-40 cursor-not-allowed': option.disabled
        }">
        {{ option.label }}
      </div>
    </RadioGroupOption>
  </RadioGroup>
</template>

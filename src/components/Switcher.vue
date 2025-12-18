<script lang="ts">
export type { SwitcherOption } from '../types/selection'
</script>

<script
  setup
  lang="ts"
  generic="T extends SwitcherOption = SwitcherOption, ModelValue extends string = string">
import { computed } from 'vue'
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import AIcon from './Icon.vue'
import { type SwitcherOption } from '../types/selection'
import { type SmIcon, type SmIconId } from './icons/types'

const props = withDefaults(
  defineProps<{
    modelValue: ModelValue
    options: T[]
    label?: string
    raised?: boolean
    disabled?: boolean
  }>(),
  {
    label: '',
    raised: false,
    disabled: false
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: ModelValue]
}>()

const model = computed({
  get: (): ModelValue => props.modelValue,
  set: (value: ModelValue) => emit('update:modelValue', value)
})
</script>
<template>
  <RadioGroup
    v-model="model"
    class="p-1 rounded bg-whisper flex max-w-fit gap-1"
    :class="{ 'shadow-sm': raised }"
    :disabled="disabled">
    <RadioGroupLabel class="sr-only">{{ label }}</RadioGroupLabel>
    <RadioGroupOption
      v-for="option in options"
      :key="String(option.value)"
      v-slot="{ checked }"
      :value="option.value"
      :disabled="option.disabled || disabled"
      class="focus-visible:focus-outline flex h-8 rounded transition-colors duration-500 ease-out cursor-pointer">
      <div
        class="flex items-center px-3 py-1 rounded"
        :class="{
          'text-mediumblue bg-zurich': checked,
          'hover:bg-gray hover:text-navy active:bg-zurich48 active:text-mediumblue':
            !option.disabled && !disabled && !checked,
          'opacity-40 cursor-not-allowed': option.disabled || disabled
        }"
        :aria-label="option.icon ? option.label : undefined"
        :title="option.icon ? option.label : undefined">
        <slot :name="String(option.value)">
          <a-icon
            v-if="option.icon"
            :icon="option.icon.endsWith('-sm') ? (option.icon as SmIconId) : undefined"
            :name="option.icon.endsWith('-sm') ? undefined : (option.icon as SmIcon)"
            :size="option.icon.endsWith('-sm') ? undefined : 'sm'"></a-icon>
          <template v-else>
            {{ option.label }}
          </template>
        </slot>
      </div>
    </RadioGroupOption>
  </RadioGroup>
</template>

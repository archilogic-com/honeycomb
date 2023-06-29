<script lang="ts">
import { defineComponent } from 'vue'
import ALabelContainer from './LabelContainer.vue'
import AHelperText from './HelperText.vue'

let id = 0

const createId = () => {
  return ++id
}

export default defineComponent({
  name: 'AInputGroup',
  components: { ALabelContainer, AHelperText },
  props: {
    /**
     * The label for the input or control
     */
    label: {
      type: String,
      default: ''
    },
    /**
     * An optional helper for the input field,
     * containing the error message or input format requirements
     */
    helper: {
      type: String,
      default: ''
    },
    /**
     * Whether the input field is in an invalid state
     */
    invalid: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    let helperId

    if (props.helper) {
      helperId = `a-input-group--helper-${createId()}`
    }
    const labelId = `a-input-group--label-${createId()}`

    return {
      labelId,
      helperId
    }
  }
})
</script>
<template>
  <ALabelContainer>
    <template #label>
      <label :id="labelId" class="flex">
        <slot name="label">
          {{ label }}
        </slot>
      </label>
    </template>
    <div class="flex w-full flex-col">
      <slot name="input" :labelledby="labelId" :describedby="helperId"></slot>
      <a-helper-text
        v-show="helper || $slots.helper"
        :id="helperId"
        aria-live="polite"
        aria-relevant="all"
        :variant="invalid ? 'error' : 'hint'">
        <slot name="helper">{{ helper }}</slot>
      </a-helper-text>
    </div>
  </ALabelContainer>
</template>

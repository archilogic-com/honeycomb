import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { ref, computed } from 'vue'
import { ACheckbox, ACheckboxSelectAll, AButton } from '../components'

type CheckboxArgs = ComponentProps<typeof ACheckbox> & {
  checked?: boolean
  default?: string
  disabled?: boolean
}

const meta: Meta<CheckboxArgs> = {
  title: 'Components/Checkbox',
  component: ACheckbox
}

export default meta

type Story = StoryObj<CheckboxArgs>

const render = (args: CheckboxArgs) => ({
  components: { ACheckbox },
  setup() {
    const checkedState = ref(args.checked)
    return { args, checkedState }
  },
  template: `<ACheckbox v-bind="args" v-model="checkedState">${args.default || ''}</ACheckbox>`
})

export const CheckboxOn: Story = {
  name: 'checkbox on',
  render,
  args: { checked: true, label: 'on' }
}

export const CheckboxOff: Story = {
  name: 'checkbox off',
  render,
  args: { checked: false, label: 'off' }
}

export const CheckboxMixed: Story = {
  name: 'checkbox mixed',
  render,
  args: { checked: true, mixed: true, label: 'mixed' }
}

export const CheckboxOnDisabled: Story = {
  name: 'checkbox on disabled',
  render,
  args: { checked: true, disabled: true, label: 'on' }
}

export const CheckboxOffDisabled: Story = {
  name: 'checkbox off disabled',
  render,
  args: { checked: false, disabled: true, label: 'off' }
}

export const CheckboxMixedDisabled: Story = {
  name: 'checkbox mixed disabled',
  render,
  args: { checked: true, disabled: true, mixed: true, label: 'mixed' }
}

export const MultipleCheckboxes: Story = {
  name: 'multiple checkboxes',
  render: () => ({
    components: { ACheckbox },
    setup() {
      const options = ['coffee', 'tea', 'schoggi']
      const selected = ref([])
      return { selected, options }
    },
    template: `
      <div>
        <fieldset>
          <legend>Choose your drinks:</legend>
          <a-checkbox v-for="option in options" v-model="selected" :label="option" :value="option"/>
        </fieldset>
        <p class="body-md">Selected: {{selected.join(', ')}}</p>
      </div>
      `
  })
}

export const CheckboxWithLabelProp: Story = {
  name: 'checkbox with label prop',
  render,
  args: { checked: true, label: 'Label Prop' }
}

export const CheckboxWithLongLabelProp: Story = {
  name: 'checkbox with long label prop',
  render: () => ({
    components: { ACheckbox },
    setup() {
      return { state: true }
    },
    template: `
      <div class="max-w-[300px]">
        <a-checkbox v-model="state" label="Yes, Archilogic can contact me on a one-to-one basis and send me quarter product updates and relevant notifications."/>
      </div>`
  })
}

export const CheckboxWithDefaultSlot: Story = {
  name: 'checkbox with default slot',
  render,
  args: { checked: true, default: '<p class="body-sm-600">Bold Label in Slot</p>' }
}

export const CheckboxWithHiddenLabel: Story = {
  name: 'checkbox with hidden label',
  render,
  args: { checked: true, label: 'select all', hideLabel: true }
}

export const CheckboxWithMixedState: Story = {
  name: 'checkbox with mixed state',
  render: () => ({
    components: { ACheckbox },
    setup() {
      const options = ['coffee', 'tea', 'schoggi']
      const selected = ref(['coffee', 'tea'])
      const selectAllState = computed(() => {
        if (selected.value.length === 3) {
          return true
        }
        return false
      })
      const mixedState = computed(() => {
        if (selected.value.length > 0 && selected.value.length < 3) {
          return true
        }
        return false
      })
      const handleChange = (newValue: boolean) => {
        if (newValue) {
          selected.value = [...options]
        } else {
          selected.value = []
        }
      }
      return { handleChange, selected, selectAllState, mixedState, options }
    },
    template: `
      <div>
        <fieldset class="ml-2">
          <legend>Choose your drinks:</legend>
          <a-checkbox :model-value="selectAllState" @update:model-value="handleChange" label="Select All" :mixed="mixedState" />
          <a-checkbox class="ml-2" v-for="option in options" v-model="selected" :label="option" :value="option"/>
        </fieldset>
        <p class="body-md">Selected: {{selected.join(', ')}}</p>
      </div>`
  })
}

export const SelectAllCheckbox: Story = {
  name: 'select all checkbox',
  render: () => ({
    components: { ACheckbox, ACheckboxSelectAll },
    setup() {
      const options = ['coffee', 'tea', 'schoggi']
      const selected = ref(['coffee', 'tea'])
      return { selected, options }
    },
    template: `
      <div>
        <fieldset class="ml-2">
          <legend>Choose your drinks:</legend>
          <a-checkbox-select-all
            :selected-size="selected.length"
            :items-size="options.length"
            @select="selected = [...options]"
            @clear="selected = []">
          </a-checkbox-select-all>
          <a-checkbox class="ml-2" v-for="option in options" v-model="selected" :label="option" :value="option"/>
        </fieldset>
        <p class="body-md">Selected: {{selected.join(', ')}}</p>
      </div>`
  })
}

export const SelectAllWithCustomSlot: Story = {
  name: 'select all with custom slot',
  render: () => ({
    components: { ACheckbox, ACheckboxSelectAll },
    setup() {
      const options = ['coffee', 'tea', 'schoggi']
      const selected = ref(['coffee', 'tea'])
      return { selected, options }
    },
    template: `
      <div>
        <fieldset class="ml-2">
          <legend>Choose your drinks:</legend>
          <a-checkbox-select-all
            :selected-size="selected.length"
            :items-size="options.length"
            @select="selected = [...options]"
            @clear="selected = []">
            <span class="body-sm-600">Select All ({{ selected.length }}/{{ options.length }})</span>
          </a-checkbox-select-all>
          <a-checkbox class="ml-2" v-for="option in options" v-model="selected" :label="option" :value="option"/>
        </fieldset>
        <p class="body-md">Selected: {{selected.join(', ')}}</p>
      </div>`
  })
}

export const ReadonlyCheckbox: Story = {
  name: 'readonly checkbox',
  render: () => ({
    components: { ACheckbox, AButton },
    setup() {
      const state = ref(false)
      const handleChange = () => {
        state.value = !state.value
      }
      return {
        state,
        handleChange
      }
    },
    template: `
      <div>
        <a-checkbox :model-value="state" label="Readonly checkbox" readonly />
        <a-button @click="handleChange">Toggle checkbox</a-button>
      </div>`
  })
}

import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'
import { ref } from 'vue'
import { AToggle } from '../components'

type TogglePropsAndAttrs = ComponentProps<typeof AToggle> & { disabled?: boolean }

const meta: Meta<TogglePropsAndAttrs> = {
  component: AToggle,
  title: 'Components/Toggle',
  args: {
    labelId: 'toggleLabel'
  }
}

export default meta

type Story = StoryObj<TogglePropsAndAttrs>

const renderToggle = (args: TogglePropsAndAttrs) => ({
  components: { AToggle },
  setup() {
    const pressedState = ref(args.modelValue)
    return { args, pressedState }
  },
  template: `<AToggle v-bind="args" v-model="pressedState"></AToggle>`
})

export const On: Story = {
  render: renderToggle,
  args: {
    modelValue: true
  }
}

export const Off: Story = {
  render: renderToggle,
  args: {
    modelValue: false
  }
}

export const Mixed: Story = {
  render: renderToggle,
  args: {
    modelValue: 'mixed'
  }
}

export const OnDisabled: Story = {
  render: renderToggle,
  args: {
    modelValue: true,
    disabled: true
  }
}

export const OffDisabled: Story = {
  render: renderToggle,
  args: {
    modelValue: false,
    disabled: true
  }
}

export const MixedDisabled: Story = {
  render: renderToggle,
  args: {
    modelValue: 'mixed',
    disabled: true
  }
}

export const WithLabel: Story = {
  render: () => ({
    components: { AToggle },
    setup() {
      const toggleState = ref(true)
      return { toggleState }
    },
    template: `
      <div class="flex items-center">
        <p id="email-notifications" class="body-lg-500 pr-1">Email notifications</p>
        <a-toggle v-model="toggleState" labelId="email-notifications" />
      </div>`
  })
}

export const WithClickableLabel: Story = {
  render: () => ({
    components: { AToggle },
    setup() {
      const toggleState = ref(true)
      const handleChange = () => {
        toggleState.value = !toggleState.value
      }
      return { handleChange, toggleState }
    },
    template: `
      <div class="flex items-center">
        <p id="clickable-label"  class="body-lg-500 pr-1 cursor-pointer" @click="handleChange">Clicking on this label will also switch the toggle</p>
        <a-toggle v-model="toggleState" labelId="clickable-label" />
      </div>`
  })
}

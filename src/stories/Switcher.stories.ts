import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'

import ASwitcher from '../components/Switcher.vue'
import AIcon from '../components/Icon.vue'

/**
 *
 * The `<a-switcher>` component is a wrapper around
 * [Headless UI's Radio Group components](https://headlessui.com/vue/radio-group).
 *
 * ```html
 * <a-switcher label="Units" :options="unitList" v-model="selectedUnits"/>
 * ```
 */
const meta: Meta<typeof ASwitcher> = {
  component: ASwitcher,
  title: 'Components/Switcher',
  decorators: [
    () => ({
      template: `<div class="p-10 bg-white"><story/></div>`
    })
  ]
}

export default meta

type Story = StoryObj<typeof ASwitcher>

type SwitcherProps = ComponentProps<typeof ASwitcher>

const renderSwitcher = (args: SwitcherProps) => ({
  components: { ASwitcher },
  setup() {
    const selected = ref(args.options[0].value)

    return { selected, args }
  },
  template: `
      <ASwitcher v-model="selected" v-bind="args" />`
})

/**
 * The switcher component requires a list of `options`, a `v-model` value, and a `label` string for accessible label of the component as a whole.
 */
export const Primary: Story = {
  render: renderSwitcher,
  args: {
    options: [
      { label: 'Metric', value: 'm' },
      { label: 'Imperial', value: 'i' }
    ],
    label: 'Units'
  }
}

/**
 * The Switcher component can display several options,
 * but in most cases for selection between more than three options we recommend considering a different component, e.g. Listbox or Combobox.
 */
export const ThreeOptions: Story = {
  render: renderSwitcher,
  args: {
    options: [
      { label: 'Map', value: 'map' },
      { label: 'Tiles', value: 'tile' },
      { label: 'Table', value: 'table' }
    ],
    label: 'View'
  }
}

/**
 * One of the options can be disabled by passing a disabled property on the relevant option object.
 */
export const DisabledOption: Story = {
  render: renderSwitcher,
  args: {
    options: [
      { label: 'Map', value: 'map' },
      { label: 'Tiles', value: 'tile', disabled: true },
      { label: 'Table', value: 'table' }
    ],
    label: 'View'
  }
}

/**
 * Or you can disable the whole component by setting the `disabled` prop on `<a-switcher>`.
 */
export const DisabledSwitcher: Story = {
  render: renderSwitcher,
  args: {
    ...ThreeOptions.args,
    disabled: true
  }
}

/**
 * If the options have an icon property,
 * the value of the label property will be passed to the option's `aria-label` attribute,
 * and the icon displayed to the user.
 *
 * **Note**: only icons of size "sm" are currently supported.
 */
export const IconOptions: Story = {
  render: renderSwitcher,
  args: {
    options: [
      { label: 'Basic search', value: 'basic', icon: 'Search' },
      { label: 'AI search', value: 'ai', icon: 'Ai' }
    ],
    label: 'Search type'
  }
}

/**
 * For arbitrary content, such as icon + text label, unsupported icons, or customized style
 * option slots can be used.
 * The switcher component exposes a dynamic slot for each option
 * generated with the option's value as the slot's name.
 *
 * For information on template syntax for dynamic slot names, see
 * [official vue documentation](https://vuejs.org/guide/components/slots.html#dynamic-slot-names).
 */
export const UsingSlots: Story = {
  render: args => ({
    components: { ASwitcher, AIcon },
    setup() {
      const selected = ref(args.options[0].value)

      return { selected, args }
    },
    template: `
      <ASwitcher v-model="selected" v-bind="args">
        <template #ai><a-icon name="ai" size="sm" class="mr-1"/> AI search</template>
      </ASwitcher>`
  }),
  args: {
    options: [
      { label: 'Basic search', value: 'basic' },
      { label: 'AI search', value: 'ai' }
    ],
    label: 'Search type'
  }
}

/**
 * For an elevated appearance (with box-shadow), set the `raised` prop on `<a-switcher>`.
 */
export const RaisedSwitcher: Story = {
  render: renderSwitcher,
  args: {
    ...Primary.args,
    raised: true
  }
}

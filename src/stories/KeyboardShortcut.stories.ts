import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'
import { AKeyboardShortcut } from '../components'

type KeyboardShortcutProps = ComponentProps<typeof AKeyboardShortcut>

/**
 */
const meta: Meta<KeyboardShortcutProps> = {
  component: AKeyboardShortcut,
  title: 'Components/KeyboardShortcut'
}

export default meta

type Story = StoryObj<KeyboardShortcutProps>

const renderKeyboardShortcut = (args: ComponentProps<KeyboardShortcutProps>) => ({
  components: { AKeyboardShortcut },
  setup() {
    return { args }
  },
  template: `
  <AKeyboardShortcut v-bind="args"></AKeyboardShortcut>`
})

/**
 */
export const Primary: Story = {
  render: renderKeyboardShortcut,
  args: {
    shortcut: { modifiers: ['shift'], keySequence: 'K' }
  }
}

export const Mouse: Story = {
  ...Primary,
  args: {
    shortcut: { modifiers: ['shift'], mouseEvent: 'click' }
  }
}

export const MultipleShortcuts: Story = {
  ...Primary,
  args: {
    shortcut: [
      { modifiers: ['meta'], keySequence: 'Y' },
      { modifiers: ['meta', 'shift'], keySequence: 'Z' }
    ]
  }
}

/**
 * Use `subtle` variant for menu items or other use cases where the shortcut background should be transparent
 */
export const SingleSubtle: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    variant: 'subtle'
  }
}

export const MultipleShortcutsSubtle: Story = {
  ...MultipleShortcuts,
  args: {
    ...MultipleShortcuts.args,
    variant: 'subtle'
  }
}

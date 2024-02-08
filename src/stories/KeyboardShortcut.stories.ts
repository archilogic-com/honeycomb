import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'
import { AKeyboardShortcut } from '../components'

type KeyboardShortcutProps = ComponentProps<typeof AKeyboardShortcut>

/**
 * The KeyboardShortcut component accepts either a single shortcut or an array of shortcuts to display.
 * Each shortcut object can have one or more `modifiers` (`shift`, `alt`, etc),
 * and either a `keySequence` consisting of one or more keys or a `mouseEvent` (e.g. 'click', 'drag')
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
 * A single shortcut with a modifier and a key
 */
export const Primary: Story = {
  render: renderKeyboardShortcut,
  args: {
    shortcut: { modifiers: ['shift'], keySequence: 'K' }
  }
}

/**
 * A single shortcut with a modifier and a mouse event
 */
export const Mouse: Story = {
  ...Primary,
  args: {
    shortcut: { modifiers: ['shift'], mouseEvent: 'click' }
  }
}

/**
 * Multiple shortcuts passed to `shortcut` prop
 */
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

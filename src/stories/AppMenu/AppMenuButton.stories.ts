import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'
import { AAppMenu, AAppMenuItem, AAppMenuButton, AButton, AIcon } from '../../components'
import { menuStoriesDecorators, menuStoriesParameters, openMenu } from './shared'

/**
 * `<a-app-menu-button>` (aka `<a-popup-button>`) renders an AButton component by default,
 * and accepts [AButton's props](path=/docs/components-button--docs) in addition to APopupButton props.
 */
const meta: Meta<typeof AAppMenuButton> = {
  component: AAppMenuButton,
  title: 'Components/AppMenu/AppMenuButton',
  parameters: { ...menuStoriesParameters },
  decorators: [...menuStoriesDecorators]
}

export default meta

type AppMenuButtonProps = ComponentProps<typeof AAppMenuButton> &
  ComponentProps<typeof AButton> & { default: string }

type Story = StoryObj<AppMenuButtonProps>

const renderAppMenu = (args: AppMenuButtonProps) => ({
  components: { AAppMenu, AAppMenuItem, AAppMenuButton, AIcon },
  setup() {
    const { default: slot, ...restArgs } = args
    return { slot, restArgs }
  },
  template: `
        <AAppMenu>
          <template #menu-button="{open, aria}">
            <AAppMenuButton v-bind="{...aria, open, ...restArgs}" size="lg">
              <template #default v-if="slot">
                ${args.default}
              </template>
            </AAppMenuButton>
          </template>
          <AAppMenuItem>Cut</AAppMenuItem>
          <AAppMenuItem>Copy</AAppMenuItem>
          <AAppMenuItem>Paste</AAppMenuItem>
        </AAppMenu>
      `
})

export const Primary: Story = {
  render: renderAppMenu,
  args: {
    label: 'Edit'
  },
  play: openMenu
}

/**
 * Using an icon button (same as `a-button` icon buttons)
 */
export const IconButton: Story = {
  ...Primary,
  args: {
    icon: 'More',
    label: 'Actions'
  }
}

/**
 * AppMenuButton with a text label and an icon.
 */
export const TextAndIcon: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    default: `Edit <a-icon name="ChevronDown" size="other" />`
  }
}

/**
 * The trigger button stays pressed by default while the menu is open.
 * To turn that behavior off, pass `:pressed="false"`.
 */
export const PressedStateOff: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    pressed: false
  }
}

/**
 * AppMenuButton can be disabled with a `disabled` attribute.
 */
export const Disabled: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    disabled: true
  }
}

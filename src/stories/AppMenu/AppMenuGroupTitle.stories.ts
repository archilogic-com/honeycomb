import type { Meta, StoryObj } from '@storybook/vue3'
import isChromatic from 'chromatic/isChromatic'
import {
  AAppMenu,
  AAppMenuItem,
  AAppMenuSeparator,
  AAppMenuButton,
  AAppMenuGroupTitle
} from '../../components'
import { menuStoriesDecorators, menuStoriesParameters } from './shared'

/**
 *
 * Menu items can be grouped by placing a `<a-app-menu-separator>` between groups.
 * AAppMenuSeparator returns the ASeparator component set to render as an `<li>` element.
 * It does not accept any props.
 *
 * Grouped menu items can have an optional non-interactive title element (`<a-app-menu-group-title>` component),
 * see available props in the table below.
 */
const meta: Meta<typeof AAppMenuGroupTitle> = {
  component: AAppMenuGroupTitle,
  title: 'Components/AppMenu/Grouping Items',
  parameters: menuStoriesParameters,
  decorators: menuStoriesDecorators
}

export default meta

type Story = StoryObj<typeof AAppMenuGroupTitle>

export const GroupedItemsWithTitle: Story = {
  render: () => ({
    components: { AAppMenu, AAppMenuItem, AAppMenuButton, AAppMenuSeparator, AAppMenuGroupTitle },
    template: `
         <AAppMenu :open="${isChromatic()}">
          <template #menu-button="{open, aria}">
            <AAppMenuButton :open="open" v-bind="aria">My menu</AAppMenuButton>
          </template>
          <AAppMenuGroupTitle>My group</AAppMenuGroupTitle>
          <AAppMenuItem>Option X</AAppMenuItem>
          <AAppMenuItem>Option Y</AAppMenuItem>
          <AAppMenuItem>Option Z</AAppMenuItem>
          <AAppMenuSeparator />
          <AAppMenuItem>Help</AAppMenuItem>
          <AAppMenuItem>Account</AAppMenuItem>
        </AAppMenu>
      `
  })
}

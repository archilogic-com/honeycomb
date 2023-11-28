import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'

import {
  APopup,
  AAppMenu,
  AAppMenuItem,
  AAppMenuButton,
  AAppMenuSeparator,
  AStatus,
  AColorCircle
} from '../../components'
import {
  menuStoriesDecorators,
  menuStoriesParameters,
  openMenu,
  openMenuAndSubmenu
} from './shared'
/**
 * AAppMenu is a component for application menus that closely resemble desktop application menus.
 * It implements all the [behaviors and semantics conventional for such menus](https://www.w3.org/TR/wai-aria-practices/#menu).
 *
 * AAppMenu is a wrapper around the `<a-popup>` component and it accepts the [same props](?path=/docs/components-popup--docs).
 */
const meta: Meta<typeof AAppMenu> = {
  component: AAppMenu,
  title: 'Components/AppMenu',
  parameters: { ...menuStoriesParameters },
  decorators: [...menuStoriesDecorators]
}

export default meta

type Story = StoryObj<typeof APopup>

type AppMenuProps = ComponentProps<typeof APopup>

const renderAppMenu = (args: AppMenuProps) => ({
  components: { AAppMenu, AAppMenuItem, AAppMenuButton },
  setup() {
    return { args }
  },
  template: `
        <AAppMenu v-bind="args">
          <template #menu-button="{open, aria }">
            <AAppMenuButton :open="open" v-bind="aria">Edit</AAppMenuButton>
          </template>
          <AAppMenuItem>Cut</AAppMenuItem>
          <AAppMenuItem>Copy</AAppMenuItem>
          <AAppMenuItem>Paste</AAppMenuItem>
        </AAppMenu>
      `
})

export const Primary: Story = {
  render: renderAppMenu,
  play: openMenu
}

/**
 * This menu is right-aligned, meaning the right edge of the dropdown
 * is aligned to the right edge of the trigger button.
 *
 * ```html
 * <a-app-menu align="right">…</a-app-menu>
 * ```
 */
export const RightAligned: Story = {
  ...Primary,
  args: {
    align: 'right',
    class: 'ml-auto'
  }
}

/**
 * This menu opens upwards instead of downwards.
 *
 * ```html
 * <a-app-menu direction="up">…</a-app-menu>
 * ```
 */
export const OpeningUpwards: Story = {
  ...Primary,
  args: {
    direction: 'up',
    class: 'mt-auto'
  }
}

/**
 * Application menus can be complex components with multiple branches of submenus,
 * containing various types of menu items, having different states (selected, disabled),
 * grouped by separators, and displaying various extra items like icons, keyboard shortcuts and badges.
 *
 * The following example shows how all these options can fit together.
 */
export const AllTogether: Story = {
  render: () => ({
    components: {
      AAppMenu,
      AAppMenuItem,
      AAppMenuButton,
      AAppMenuSeparator,
      AStatus,
      AColorCircle
    },
    setup() {
      const items = ref([
        { label: 'Show floor plan image', value: true, disabled: true },
        { label: 'Show assets', value: false },
        { label: 'Show ceiling lights', value: true, shortcut: '⌘ L' }
      ])
      const toggleOption = (item: { value: boolean }) => {
        item.value = !item.value
      }
      const labels = [
        { color: 'sanfran', text: 'Demo' },
        { color: 'flamingo', text: 'nice project' },
        { color: 'warning', text: 'annoying client' }
      ]
      return {
        items,
        toggleOption,
        labels
      }
    },
    template: `
        <AAppMenu>
          <template #menu-button="{open, aria}">
            <AAppMenuButton :open="open" v-bind="aria" size="lg" icon="Burger" label="Menu"></AAppMenuButton>
          </template>
          <AAppMenuItem href="https://testing-app.archilogic.com" target="dashboard">Go to dashboard</AAppMenuItem>
          <AAppMenuItem>
            Floor
            <template #extra><AStatus variant="primary">new</AStatus></template>
            <template #submenu>
              <AAppMenuItem>New</AAppMenuItem>
              <AAppMenuItem disabled shortcut="⌘ D">Duplicate
              </AAppMenuItem>
              <AAppMenuItem>Archive</AAppMenuItem>
              <AAppMenuItem>Label
                <template #submenu>
                  <AAppMenuItem v-for="label in labels">
                    <template #icon>
                      <a-color-circle :color="label.color"/>
                    </template>
                    {{label.text}}
                  </AAppMenuItem>
                </template>
              </AAppMenuItem>
            </template>
          </AAppMenuItem>
          <AAppMenuItem>
            View
            <template #submenu>
              <AAppMenuItem
                v-for="item in items"
                :key="item.label"
                :selected="item.value"
                :shortcut="item.shortcut"
                :disabled="item.disabled"
                role="checkbox"
                @select="toggleOption(item)"
              >
              {{item.label}}
              </AAppMenuItem>
              <AAppMenuSeparator />
              <AAppMenuItem shortcut="^ %">
                <template #extra><AStatus variant="danger">beta</AStatus></template>
                X-Ray mode
              </AAppMenuItem>
            </template>
          </AAppMenuItem>
        </AAppMenu>
      `
  }),
  play(params) {
    openMenuAndSubmenu(params, 2)
  }
}

/**
 * A story for multiple AppMenus on a page
 */
export const MultipleMenus: Story = {
  render: () => ({
    components: { AAppMenu, AAppMenuItem, AAppMenuButton, AAppMenuSeparator },
    template: `
        <div class="flex flex-col gap-2">
          <AAppMenu v-for="menu in 2">
            <template #menu-button="{open, aria}">
              <AAppMenuButton :open="open" v-bind="aria">Floor</AAppMenuButton>
            </template>
            <AAppMenuItem>File</AAppMenuItem>
          </AAppMenu>
        </div>
      `
  })
}

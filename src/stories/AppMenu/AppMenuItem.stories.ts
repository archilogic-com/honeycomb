import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import {
  AAppMenu,
  AAppMenuItem,
  AAppMenuButton,
  AAppMenuSeparator,
  AIcon,
  AColorCircle,
  AStatus
} from '../../components'
import {
  menuStoriesDecorators,
  menuStoriesParameters,
  openMenu,
  openMenuAndSubmenu
} from './shared'

/**
 */
const meta: Meta<typeof AAppMenuItem> = {
  component: AAppMenuItem,
  title: 'Components/AppMenu/AppMenuItem',
  parameters: { ...menuStoriesParameters },
  decorators: [...menuStoriesDecorators]
}

export default meta

type MenuItem = { label: string; value: boolean }

type AppMenuItemProps = ComponentProps<typeof AAppMenuItem> & {
  items: MenuItem[]
}

type Story = StoryObj<AppMenuItemProps>

const renderAppMenu = (args: AppMenuItemProps) => ({
  components: { AAppMenu, AAppMenuItem, AAppMenuButton },
  setup() {
    const items = ref(args.items)
    const toggleOption = (item: MenuItem) => {
      if (args.role === 'checkbox') {
        item.value = !item.value
      } else if (args.role === 'radio') {
        items.value.forEach(menuItem => {
          if (menuItem === item) {
            menuItem.value = true
          } else {
            menuItem.value = false
          }
        })
      }
    }
    return {
      items,
      toggleOption,
      args
    }
  },
  template: `
        <AAppMenu>
          <template #menu-button="{open, aria}">
            <AAppMenuButton :open="open" v-bind="aria">Options</AAppMenuButton>
          </template>
          <AAppMenuItem
            v-for="item in args.items"
            :key="item.label"
            :selected="item.value"
            v-bind="args"
            @select="toggleOption(item)"
          >
           {{item.label}}
          </AAppMenuItem>
        </AAppMenu>
      `
})

const checkOrRadioItems = [
  { label: 'Show floor plan image', value: true },
  { label: 'Show assets', value: false },
  { label: 'Show ceiling lights', value: false }
]

/**
 * You can specify the role of the menu item to be 'checkbox' or 'radio',
 * which will set the appropriate aria role on the item.
 * If `selected` prop is set to "true", a "Check" icon will be displayed by default.
 *
 * It is recommended to use `a-app-menu-separator` with groups of `radio` and `checkbox` menu items.
 *
 * **Note**: Do not store the state of the `selected` value of the menu item or any other state within AppMenuItem wrapper components.
 * When the menu or submenu is closed, all menu items get unmounted and their state is reset to the initial values.
 */

export const Checkbox: Story = {
  render: renderAppMenu,
  args: {
    role: 'checkbox',
    items: [...checkOrRadioItems]
  },
  play: openMenu
}

export const Radio: Story = {
  render: renderAppMenu,
  args: {
    role: 'radio',
    items: [...checkOrRadioItems]
  },
  play: openMenu
}

/**
 * Menu items may have a small icon or another small indicator
 * (e.g. `<a-color-circle>`) to their left.
 */
export const IconIndicator: Story = {
  render: () => ({
    components: { AAppMenu, AAppMenuItem, AAppMenuButton, AIcon, AColorCircle },
    template: `
        <AAppMenu>
          <template #menu-button="{open, aria}">
            <AAppMenuButton :open="open" v-bind="aria">Sort by</AAppMenuButton>
          </template>
          <AAppMenuItem>Name</AAppMenuItem>
          <AAppMenuItem>
            <template #icon>
              <AIcon name="ArrowUp" size="sm" />
            </template>
            Date
          </AAppMenuItem>
          <AAppMenuItem>
            <template #icon>
              <AColorCircle color="sanfran"></AColorCircle>
            </template>
            Status
          </AAppMenuItem>
        </AAppMenu>
      `
  }),
  play: openMenu
}

/**
 * Menu items have an `#extra` slot on the right side, e.g. for `<a-status>` badges.
 */
export const ExtraSlot: Story = {
  render: () => ({
    components: { AAppMenu, AAppMenuItem, AAppMenuButton, AStatus },
    template: `
        <AAppMenu>
          <template #menu-button="{open, aria}">
            <AAppMenuButton :open="open" v-bind="aria">Edit</AAppMenuButton>
          </template>
          <AAppMenuItem>Cut</AAppMenuItem>
          <AAppMenuItem>
            <template #extra>
              <AStatus variant="primary">Beta</AStatus>
            </template>
            Copy
          </AAppMenuItem>
          <AAppMenuItem>Status</AAppMenuItem>
        </AAppMenu>
      `
  }),
  play: openMenu
}

/**
 * You can provide a `shortcut` prop for displaying a keyboard shortcut
 * corresponding to the menu item's `@select` action.
 */
export const Shortcut: Story = {
  render: () => ({
    components: { AAppMenu, AAppMenuItem, AAppMenuButton },
    template: `
        <AAppMenu>
          <template #menu-button="{open, aria}">
            <AAppMenuButton :open="open" v-bind="aria">Edit</AAppMenuButton>
          </template>
          <AAppMenuItem>Cut</AAppMenuItem>
          <AAppMenuItem shortcut="Ctrl C">
            Copy
          </AAppMenuItem>
          <AAppMenuItem>Status</AAppMenuItem>
        </AAppMenu>
      `
  }),
  play: openMenu
}

/**
 * If you provide an `href` prop, the menu item will be rendered as a link,
 * with appropriate aria roles assigned.
 */
export const Link: Story = {
  render: () => ({
    components: { AAppMenu, AAppMenuItem, AAppMenuButton },
    template: `
        <AAppMenu>
          <template #menu-button="{open}">
            <AAppMenuButton :open="open">Resources</AAppMenuButton>
          </template>
          <AAppMenuItem target="_blank" href="https://help.archilogic.com/">Knowledge base</AAppMenuItem>
          <AAppMenuItem target="_blank" href="http://testing-developers.archilogic.com/space-api/v2">Developer Docs</AAppMenuItem>
        </AAppMenu>
      `
  }),
  play: openMenu
}

/**
 * Menu items can be disabled
 */
export const Disabled: Story = {
  render: () => ({
    components: { AAppMenu, AAppMenuItem, AAppMenuButton },
    template: `
        <AAppMenu>
          <template #menu-button="{open}">
            <AAppMenuButton :open="open">Sort by</AAppMenuButton>
          </template>
          <AAppMenuItem>Name</AAppMenuItem>
          <AAppMenuItem disabled>Date</AAppMenuItem>
          <AAppMenuItem>Status</AAppMenuItem>
        </AAppMenu>
      `
  }),
  play: openMenu
}

/**
 * AAppMenuItem component has a `#submenu` slot that accepts a list of `<AAppMenuItem>`s.
 */
export const SubmenuSlot: Story = {
  render: () => ({
    components: { AAppMenu, AAppMenuItem, AAppMenuButton, AAppMenuSeparator },
    setup() {
      const items = ref([...checkOrRadioItems])
      const toggleOption = (item: MenuItem) => {
        item.value = !item.value
      }
      return {
        items,
        toggleOption
      }
    },
    template: `
        <AAppMenu>
          <template #menu-button="{open, aria}">
            <AAppMenuButton :open="open" v-bind="aria" size="lg" icon="Burger" label="Menu"></AAppMenuButton>
          </template>
          <AAppMenuItem>Go to dashboard</AAppMenuItem>
          <AAppMenuItem>
            Floor
            <template #submenu>
              <AAppMenuItem>New</AAppMenuItem>
              <AAppMenuItem>Duplicate</AAppMenuItem>
              <AAppMenuSeparator />
              <AAppMenuItem>Archive</AAppMenuItem>
            </template>
          </AAppMenuItem>
          <AAppMenuItem>
            View
            <template #submenu>
              <AAppMenuItem
                v-for="item in items"
                :key="item.label"
                :selected="item.value"
                role="checkbox"
                @select="toggleOption.bind(null,item)"
              >
              {{item.label}}
              </AAppMenuItem>
              <AAppMenuSeparator />
              <AAppMenuItem disabled>X-Ray mode</AAppMenuItem>
            </template>
          </AAppMenuItem>
        </AAppMenu>
      `
  }),
  play: openMenuAndSubmenu
}

/**
 * Submenus with a lost list of items that don't fit on the screen become scrollable.
 */
export const SubmenuScroling: Story = {
  decorators: [() => ({ template: "<div class='v-screen p-4'><story/></div>" })],
  render: () => ({
    components: { AAppMenu, AAppMenuItem, AAppMenuButton, AAppMenuSeparator },
    template: `
        <AAppMenu>
          <template #menu-button="{open, aria}">
            <AAppMenuButton :open="open" v-bind="aria" size="lg" icon="Burger" label="Menu"></AAppMenuButton>
          </template>
          <AAppMenuItem>
            Labels
            <template #submenu>
               <AAppMenuItem>Label 1</AAppMenuItem>
               <AAppMenuItem>Label 2
                <template #submenu>
                  <AAppMenuItem>Label Option 1</AAppMenuItem>
                  <AAppMenuItem>Label Option 2</AAppMenuItem>
                </template>
               </AAppMenuItem>
              <AAppMenuItem v-for="item in 45">Label {{item + 2}}</AAppMenuItem>
            </template>
          </AAppMenuItem>
          <AAppMenuItem>Go to dashboard</AAppMenuItem>
          <AAppMenuItem>Floor</AAppMenuItem>
        </AAppMenu>
      `
  }),
  play: openMenuAndSubmenu
}

/**
 * If a menu item that has a submenu is disabled, the submenu won't be shown.
 */
export const SubmenuDisabled: Story = {
  render: () => ({
    components: { AAppMenu, AAppMenuItem, AAppMenuButton },
    template: `
        <AAppMenu>
          <template #menu-button="{open, aria}">
            <AAppMenuButton :open="open" v-bind="aria" size="lg" icon="Burger" label="Menu"></AAppMenuButton>
          </template>
          <AAppMenuItem>Go to dashboard</AAppMenuItem>
          <AAppMenuItem disabled>
            Floor
            <template #submenu>
              <AAppMenuItem>New</AAppMenuItem>
              <AAppMenuItem>Duplicate</AAppMenuItem>
              <AAppMenuItem>Archive</AAppMenuItem>
            </template>
          </AAppMenuItem>
          <AAppMenuItem>Your account</AAppMenuItem>
        </AAppMenu>
      `
  }),
  play: openMenuAndSubmenu
}

/**
 * Submenus are not limited to one level.
 * `<a-app-menu-item>`s of a submenu can have their own `#submenu` slot children, thus creating nested submenus.
 */
export const SubmenuNested: Story = {
  render: () => ({
    components: { AAppMenu, AAppMenuItem, AAppMenuButton },
    template: `
        <AAppMenu>
          <template #menu-button="{open, aria}">
            <AAppMenuButton :open="open" v-bind="aria" size="lg" icon="Burger" label="Menu"></AAppMenuButton>
          </template>
          <AAppMenuItem>Go to dashboard</AAppMenuItem>
          <AAppMenuItem>
            Floor
            <template #submenu>
              <AAppMenuItem>Recent</AAppMenuItem>
              <AAppMenuItem>Duplicate</AAppMenuItem>
              <AAppMenuItem>Archive <template #submenu>
                  <AAppMenuItem>
                    Floor 1
                  </AAppMenuItem>
                  <AAppMenuItem>
                    Floor 2
                  </AAppMenuItem>
                </template></AAppMenuItem>
            </template>
          </AAppMenuItem>
          <AAppMenuItem>Your account</AAppMenuItem>
        </AAppMenu>
      `
  }),
  play: params => {
    openMenuAndSubmenu(params, 2)
  }
}

/**
 * The submenus get repositioned to the opposite side of the parent menu if they are at the edge of the screen.
 * See story page for an example (docs page iframe does not work correctly).
 */
export const SubmenuRepositioning: Story = {
  decorators: [
    () => ({
      template: '<div class="absolute flex inset-0 p-16"><story /></div>'
    })
  ],
  render: () => ({
    components: { AAppMenu, AAppMenuItem, AAppMenuButton },
    template: `
        <AAppMenu align="right" class="ml-auto">
          <template #menu-button="{open}">
            <AAppMenuButton :open="open" size="lg" icon="Burger" label="Menu"></AAppMenuButton>
          </template>
          <AAppMenuItem>Go to dashboard</AAppMenuItem>
          <AAppMenuItem>
            Floor
            <template #submenu>
              <AAppMenuItem>Recent</AAppMenuItem>
              <AAppMenuItem>Duplicate</AAppMenuItem>
              <AAppMenuItem>
                Archive
                <template #submenu>
                  <AAppMenuItem v-for="n in 30">
                    Floor {{n}}
                  </AAppMenuItem>
                </template></AAppMenuItem>
            </template>
          </AAppMenuItem>
          <AAppMenuItem>Your account</AAppMenuItem>
        </AAppMenu>
      `
  }),
  play: params => {
    openMenuAndSubmenu(params, 2)
  }
}

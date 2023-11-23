import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import { AAppMenu, AAppMenuItem, AAppMenuMultiButton } from '../../components'
import { menuStoriesDecorators, menuStoriesParameters } from './shared'

/**
 * `<a-app-menu-multi-button>` is a special button that serves two purposes:
 * to activate some application state, and to open a related menu.
 */
const meta: Meta<typeof AAppMenuMultiButton> = {
  component: AAppMenuMultiButton,
  title: 'Components/AppMenu/AppMenuMultiButton',
  parameters: menuStoriesParameters,
  decorators: menuStoriesDecorators
}

export default meta

type Story = StoryObj<typeof AAppMenuMultiButton>

const options = ['Wall', 'Window', 'Door']

type AppMenuMultiButtonProps = ComponentProps<typeof AAppMenuMultiButton>

const renderAppMenu = (args: AppMenuMultiButtonProps) => ({
  components: { AAppMenu, AAppMenuItem, AAppMenuMultiButton },
  setup() {
    const isSpecialPressed = ref(false)
    const activeOption = ref(options[0])
    const clickSpecial = () => {
      isSpecialPressed.value = !isSpecialPressed.value
    }

    const selectActiveOption = (option: string) => {
      activeOption.value = option
    }
    return {
      isSpecialPressed,
      clickSpecial,
      selectActiveOption,
      activeOption,
      options,
      args
    }
  },
  template: `
    <AAppMenu>
      <template #menu-button="{ open, aria }">
        <AAppMenuMultiButton
          size="lg"
          variant="subtle"
          v-bind="{...aria, ...args}"
          :open="open"
          :pressed="isSpecialPressed"
          @click="clickSpecial">
          <span class="pr-1">{{activeOption}}</span>
        </AAppMenuMultiButton>
      </template>
      <AAppMenuItem v-for="option in options" @select="selectActiveOption(option)">{{option}}</AAppMenuItem>
    </AAppMenu>
  `
})

export const Primary: Story = {
  render: renderAppMenu
}

export const Disabled: Story = {
  render: renderAppMenu,
  args: {
    disabled: true
  }
}

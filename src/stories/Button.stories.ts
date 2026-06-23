import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import AButton from '../components/Button.vue'
import AIcon from '../components/Icon.vue'

type ButtonArgs = ComponentProps<typeof AButton> & {
  default?: string
  href?: string
  title?: string
  onClick?: (...args: unknown[]) => void
}

const meta: Meta<ButtonArgs> = {
  title: 'Components/Button',
  component: AButton,
  argTypes: {
    size: {
      options: ['md', 'lg'],
      control: 'radio'
    },
    variant: {
      options: ['primary', 'standard', 'subtle'],
      control: 'radio'
    },
    loading: { control: 'boolean' },
    onClick: {},
    disabled: { control: 'boolean' },
    href: { control: 'text' },
    title: { control: 'text' },
    default: {
      control: 'text'
    },
    pressed: { control: 'boolean' }
  }
}

export default meta

type Story = StoryObj<ButtonArgs>

const render = (args: ButtonArgs) => ({
  components: { AButton, AIcon },
  setup() {
    return { args }
  },
  template: `
  <AButton v-bind="args" class="m-4">${args.default || ''}
  </AButton>`
})

export const Standard: Story = {
  name: 'standard',
  render,
  args: {
    default: 'Standard'
  }
}

export const Primary: Story = {
  name: 'primary',
  render,
  args: {
    variant: 'primary',
    default: 'Primary'
  }
}

export const Subtle: Story = {
  name: 'subtle',
  render,
  args: {
    variant: 'subtle',
    default: 'Subtle'
  }
}

export const StandardWIcon: Story = {
  name: 'standard w/ icon',
  render,
  args: {
    default: 'Standard <a-icon name="ChevronDown" size="other" />'
  }
}

export const PrimaryWIcon: Story = {
  name: 'primary w/ icon',
  render,
  args: {
    variant: 'primary',
    default: 'Primary <a-icon name="ChevronDown" size="other" />'
  }
}

export const SubtleWIcon: Story = {
  name: 'subtle w/ icon',
  render,
  args: {
    variant: 'subtle',
    default: 'Subtle <a-icon name="ChevronDown" size="other" />'
  }
}

export const StandardPressed: Story = {
  name: 'standard pressed',
  render,
  args: {
    pressed: true,
    default: 'Standard'
  }
}

export const PrimaryPressed: Story = {
  name: 'primary pressed',
  render,
  args: {
    variant: 'primary',
    pressed: true,
    default: 'Primary'
  }
}

export const SubtlePressed: Story = {
  name: 'subtle pressed',
  render,
  args: {
    variant: 'subtle',
    pressed: true,
    default: 'Subtle'
  }
}

export const StandardPressedWIcon: Story = {
  name: 'standard pressed w/ icon',
  render,
  args: {
    pressed: true,
    default: 'Standard <a-icon name="ChevronDown" size="other" />'
  }
}

export const PrimaryPressedWIcon: Story = {
  name: 'primary pressed w/ icon',
  render,
  args: {
    variant: 'primary',
    pressed: true,
    default: 'Primary <a-icon name="ChevronDown" size="other" />'
  }
}

export const SubtlePressedWIcon: Story = {
  name: 'subtle pressed w/ icon',
  render,
  args: {
    variant: 'subtle',
    pressed: true,
    default: 'Subtle <a-icon name="ChevronDown" size="other" />'
  }
}

export const StandardDisabled: Story = {
  name: 'standard disabled',
  render,
  args: {
    default: 'Standard',
    disabled: true
  }
}

export const PrimaryDisabled: Story = {
  name: 'primary disabled',
  render,
  args: {
    variant: 'primary',
    default: 'Primary',
    disabled: true
  }
}

export const SubtleDisabled: Story = {
  name: 'subtle disabled',
  render,
  args: {
    variant: 'subtle',
    default: 'Subtle',
    disabled: true
  }
}

export const StandardDisabledWIcon: Story = {
  name: 'standard disabled w/ icon',
  render,
  args: {
    default: 'Standard <a-icon name="ChevronDown" size="other" />',
    disabled: true
  }
}

export const PrimaryDisabledWIcon: Story = {
  name: 'primary disabled w/ icon',
  render,
  args: {
    variant: 'primary',
    default: 'Primary <a-icon name="ChevronDown" size="other" />',
    disabled: true
  }
}

export const SubtleDisabledWIcon: Story = {
  name: 'subtle disabled w/ icon',
  render,
  args: {
    variant: 'subtle',
    default: 'Subtle <a-icon name="ChevronDown" size="other" />',
    disabled: true
  }
}

export const StandardLoading: Story = {
  name: 'standard loading',
  render,
  args: {
    default: 'Standard',
    loading: true
  }
}

export const PrimaryLoading: Story = {
  name: 'primary loading',
  render,
  args: {
    variant: 'primary',
    default: 'Primary',
    loading: true
  }
}

export const SubtleLoading: Story = {
  name: 'subtle loading',
  render,
  args: {
    variant: 'subtle',
    default: 'Subtle',
    loading: true
  }
}

export const StandardLoadingWIcon: Story = {
  name: 'standard loading w/ icon',
  render,
  args: {
    default: 'Standard <a-icon name="ChevronDown" size="other" />',
    loading: true
  }
}

export const PrimaryLoadingWIcon: Story = {
  name: 'primary loading w/ icon',
  render,
  args: {
    variant: 'primary',
    default: 'Primary <a-icon name="ChevronDown" size="other" />',
    loading: true
  }
}

export const SubtleLoadingWIcon: Story = {
  name: 'subtle loading w/ icon',
  render,
  args: {
    variant: 'subtle',
    default: 'Subtle <a-icon name="ChevronDown" size="other" />',
    loading: true
  }
}

export const StandardLarge: Story = {
  name: 'standard large',
  render,
  args: {
    variant: 'standard',
    default: 'Standard',
    size: 'lg'
  }
}

export const PrimaryLarge: Story = {
  name: 'primary large',
  render,
  args: {
    variant: 'primary',
    default: 'Primary',
    size: 'lg'
  }
}

export const SubtleLarge: Story = {
  name: 'subtle large',
  render,
  args: {
    variant: 'subtle',
    default: 'Subtle',
    size: 'lg'
  }
}

export const StandardLargeWIcon: Story = {
  name: 'standard large w/ icon',
  render,
  args: {
    size: 'lg',
    default: 'Standard <a-icon name="ChevronDown" size="other" />'
  }
}

export const PrimaryLargeWIcon: Story = {
  name: 'primary large w/ icon',
  render,
  args: {
    variant: 'primary',
    size: 'lg',
    default: 'Primary <a-icon name="ChevronDown" size="other" />'
  }
}

export const SubtleLargeWIcon: Story = {
  name: 'subtle large w/ icon',
  render,
  args: {
    variant: 'subtle',
    size: 'lg',
    default: 'Subtle <a-icon name="ChevronDown" size="other" />'
  }
}

export const StandardLargePressed: Story = {
  name: 'standard large pressed',
  render,
  args: {
    variant: 'standard',
    default: 'Standard',
    size: 'lg',
    pressed: true
  }
}

export const PrimaryLargePressed: Story = {
  name: 'primary large pressed',
  render,
  args: {
    variant: 'primary',
    default: 'Primary',
    size: 'lg',
    pressed: true
  }
}

export const SubtleLargePressed: Story = {
  name: 'subtle large pressed',
  render,
  args: {
    variant: 'subtle',
    default: 'Subtle',
    size: 'lg',
    pressed: true
  }
}

export const StandardLargePressedWIcon: Story = {
  name: 'standard large pressed w/ icon',
  render,
  args: {
    size: 'lg',
    pressed: true,
    default: 'Standard <a-icon name="ChevronDown" size="other" />'
  }
}

export const PrimaryLargePressedWIcon: Story = {
  name: 'primary large pressed w/ icon',
  render,
  args: {
    variant: 'primary',
    size: 'lg',
    pressed: true,
    default: 'Primary <a-icon name="ChevronDown" size="other" />'
  }
}

export const SubtleLargePressedWIcon: Story = {
  name: 'subtle large pressed w/ icon',
  render,
  args: {
    variant: 'subtle',
    size: 'lg',
    pressed: true,
    default: 'Subtle <a-icon name="ChevronDown" size="other" />'
  }
}

export const StandardLargeDisabled: Story = {
  name: 'standard large disabled',
  render,
  args: {
    size: 'lg',
    default: 'Standard',
    disabled: true
  }
}

export const PrimaryLargeDisabled: Story = {
  name: 'primary large disabled',
  render,
  args: {
    variant: 'primary',
    size: 'lg',
    default: 'Primary',
    disabled: true
  }
}

export const SubtleLargeDisabled: Story = {
  name: 'subtle large disabled',
  render,
  args: {
    variant: 'subtle',
    size: 'lg',
    default: 'Subtle',
    disabled: true
  }
}

export const StandardLargeDisabledWIcon: Story = {
  name: 'standard large disabled w/ icon',
  render,
  args: {
    size: 'lg',
    default: 'Standard <a-icon name="ChevronDown" size="other" />',
    disabled: true
  }
}

export const PrimaryLargeDisabledWIcon: Story = {
  name: 'primary large disabled w/ icon',
  render,
  args: {
    variant: 'primary',
    size: 'lg',
    default: 'Primary <a-icon name="ChevronDown" size="other" />',
    disabled: true
  }
}

export const SubtleLargeDisabledWIcon: Story = {
  name: 'subtle large disabled w/ icon',
  render,
  args: {
    variant: 'subtle',
    size: 'lg',
    default: 'Subtle <a-icon name="ChevronDown" size="other" />',
    disabled: true
  }
}

export const StandardLargeLoading: Story = {
  name: 'standard large loading',
  render,
  args: {
    size: 'lg',
    default: 'Standard',
    loading: true
  }
}

export const PrimaryLargeLoading: Story = {
  name: 'primary large loading',
  render,
  args: {
    variant: 'primary',
    size: 'lg',
    default: 'Primary',
    loading: true
  }
}

export const SubtleLargeLoading: Story = {
  name: 'subtle large loading',
  render,
  args: {
    variant: 'subtle',
    size: 'lg',
    default: 'Subtle',
    loading: true
  }
}

export const StandardLargeLoadingWIcon: Story = {
  name: 'standard large loading w/ icon',
  render,
  args: {
    size: 'lg',
    default: 'Standard <a-icon name="ChevronDown" size="other" />',
    loading: true
  }
}

export const PrimaryLargeLoadingWIcon: Story = {
  name: 'primary large loading w/ icon',
  render,
  args: {
    variant: 'primary',
    size: 'lg',
    default: 'Primary <a-icon name="ChevronDown" size="other" />',
    loading: true
  }
}

export const SubtleLargeLoadingWIcon: Story = {
  name: 'subtle large loading w/ icon',
  render,
  args: {
    variant: 'subtle',
    size: 'lg',
    default: 'Subtle <a-icon name="ChevronDown" size="other" />',
    loading: true
  }
}

export const ButtonSizeAuto: Story = {
  name: 'button size auto',
  render,
  args: {
    size: 'auto',
    label: 'Style One',
    default: `
        <div class="flex flex-col w-[160px] p-2">
          <div class="h-16 border border-gray flex items-center justify-center body-md-600">
            Preview
          </div>
          <div class="h-4">
            Choose style
          </div>
        </div>`
  }
}

export const Icon: Story = {
  name: 'icon',
  render,
  args: {
    icon: 'Burger',
    label: 'Menu'
  }
}

export const IconPrimary: Story = {
  name: 'icon primary',
  render,
  args: {
    variant: 'primary',
    icon: 'Burger',
    label: 'Menu'
  }
}

export const IconSubtle: Story = {
  name: 'icon subtle',
  render,
  args: {
    variant: 'subtle',
    icon: 'Burger',
    label: 'Menu'
  }
}

export const IconLg: Story = {
  name: 'icon lg',
  render,
  args: {
    icon: 'Burger',
    label: 'Menu',
    size: 'lg'
  }
}

export const IconLgPrimary: Story = {
  name: 'icon lg primary',
  render,
  args: {
    variant: 'primary',
    icon: 'Burger',
    size: 'lg',
    label: 'Menu'
  }
}

export const IconLgSubtle: Story = {
  name: 'icon lg subtle',
  render,
  args: {
    variant: 'subtle',
    icon: 'Burger',
    size: 'lg',
    label: 'Menu'
  }
}

export const IconPressed: Story = {
  name: 'icon pressed',
  render,
  args: {
    icon: 'Burger',
    pressed: true,
    label: 'Menu'
  }
}

export const IconPrimaryPressed: Story = {
  name: 'icon primary pressed',
  render,
  args: {
    variant: 'primary',
    icon: 'Burger',
    pressed: true,
    label: 'Menu'
  }
}

export const IconSubtlePressed: Story = {
  name: 'icon subtle pressed',
  render,
  args: {
    variant: 'subtle',
    icon: 'Burger',
    pressed: true,
    label: 'Menu'
  }
}

export const IconLgPressed: Story = {
  name: 'icon lg pressed',
  render,
  args: {
    icon: 'Burger',
    size: 'lg',
    pressed: true,
    label: 'Menu'
  }
}

export const IconLgPrimaryPressed: Story = {
  name: 'icon lg primary pressed',
  render,
  args: {
    variant: 'primary',
    icon: 'Burger',
    size: 'lg',
    pressed: true,
    label: 'Menu'
  }
}

export const IconLgSubtlePressed: Story = {
  name: 'icon lg subtle pressed',
  render,
  args: {
    variant: 'subtle',
    icon: 'Burger',
    size: 'lg',
    pressed: true,
    label: 'Menu'
  }
}

export const IconDisabled: Story = {
  name: 'icon disabled',
  render,
  args: {
    icon: 'Burger',
    disabled: true,
    label: 'Menu'
  }
}

export const IconPrimaryDisabled: Story = {
  name: 'icon primary disabled',
  render,
  args: {
    variant: 'primary',
    icon: 'Burger',
    disabled: true,
    label: 'Menu'
  }
}

export const IconSubtleDisabled: Story = {
  name: 'icon subtle disabled',
  render,
  args: {
    variant: 'subtle',
    icon: 'Burger',
    disabled: true,
    label: 'Menu'
  }
}

export const IconLgDisabled: Story = {
  name: 'icon lg disabled',
  render,
  args: {
    icon: 'Burger',
    disabled: true,
    size: 'lg',
    label: 'Menu'
  }
}

export const IconLgPrimaryDisabled: Story = {
  name: 'icon lg primary disabled',
  render,
  args: {
    variant: 'primary',
    icon: 'Burger',
    size: 'lg',
    disabled: true,
    label: 'Menu'
  }
}

export const IconLgSubtleDisabled: Story = {
  name: 'icon lg subtle disabled',
  render,
  args: {
    variant: 'subtle',
    icon: 'Burger',
    size: 'lg',
    disabled: true,
    label: 'Menu'
  }
}

export const IconLoading: Story = {
  name: 'icon loading',
  render,
  args: {
    icon: 'Burger',
    loading: true,
    label: 'Menu'
  }
}

export const IconPrimaryLoading: Story = {
  name: 'icon primary loading',
  render,
  args: {
    variant: 'primary',
    icon: 'Burger',
    loading: true,
    label: 'Menu'
  }
}

export const IconSubtleLoading: Story = {
  name: 'icon subtle loading',
  render,
  args: {
    variant: 'subtle',
    icon: 'Burger',
    loading: true,
    label: 'Menu'
  }
}

export const IconLgLoading: Story = {
  name: 'icon lg loading',
  render,
  args: {
    icon: 'Burger',
    loading: true,
    size: 'lg',
    label: 'Menu'
  }
}

export const IconLgPrimaryLoading: Story = {
  name: 'icon lg primary loading',
  render,
  args: {
    variant: 'primary',
    icon: 'Burger',
    size: 'lg',
    loading: true,
    label: 'Menu'
  }
}

export const IconLgSubtleLoading: Story = {
  name: 'icon lg subtle loading',
  render,
  args: {
    variant: 'subtle',
    icon: 'Burger',
    size: 'lg',
    loading: true,
    label: 'Menu'
  }
}

export const IconSm: Story = {
  name: 'icon sm',
  render,
  args: {
    icon: 'Close',
    size: 'sm'
  }
}

export const IconOther: Story = {
  name: 'icon other',
  render,
  args: {
    icon: 'Padlock',
    size: 'auto'
  }
}

export const IconAuto: Story = {
  name: 'icon auto',
  render,
  args: {
    label: 'Lock item',
    size: 'auto',
    default: '<a-icon name="Padlock" size="other" />'
  }
}

export const StandardWLabelProp: Story = {
  name: 'standard w/ label prop',
  render,
  args: {
    label: 'Standard'
  }
}

export const PrimaryWLabelProp: Story = {
  name: 'primary w/ label prop',
  render,
  args: {
    variant: 'primary',
    label: 'Primary'
  }
}

export const SubtleWLabelProp: Story = {
  name: 'subtle w/ label prop',
  render,
  args: {
    variant: 'subtle',
    label: 'Subtle'
  }
}

export const PrimaryWLabelPropAndSlotContent: Story = {
  name: 'primary w/ label prop and slot content ',
  render,
  args: {
    variant: 'primary',
    label: 'Primary Menu',
    default: 'Primary <a-icon name="ChevronDown" size="other" />'
  }
}

export const StandardWHref: Story = {
  name: 'standard w/ href',
  render,
  args: {
    default: 'Standard Link',
    href: '/?path=/story/components-button--standard'
  }
}

export const PrimaryWHref: Story = {
  name: 'primary w/ href',
  render,
  args: {
    variant: 'primary',
    default: 'Primary Link',
    href: '/?path=/story/components-button--standard'
  }
}

export const SubtleWHref: Story = {
  name: 'subtle w/ href',
  render,
  args: {
    variant: 'subtle',
    default: 'Subtle Link',
    href: '/?path=/story/components-button--standard'
  }
}

export const LargeWHref: Story = {
  name: 'large w/ href',
  render,
  args: {
    size: 'lg',
    default: 'Large Link',
    href: '/?path=/story/components-button--standard'
  }
}

export const IconWHref: Story = {
  name: 'icon w/ href',
  render,
  args: {
    icon: 'Burger',
    title: 'Menu',
    size: 'lg',
    href: '/?path=/story/components-button--standard'
  }
}

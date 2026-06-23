import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta = {
  title: 'Primitives/Border Radius',
  decorators: [
    () => ({
      template: '<div class="mb-4"><story /></div>'
    })
  ]
}

export default meta

type Story = StoryObj

export const RoundedSm: Story = {
  name: 'rounded-sm',
  render: () => {
    return {
      template: `
          <div style="width: 160px; height: 40px" class="rounded-sm border flex justify-center items-center body-sm"> 2px </div>
          <p class="body-sm text-warsaw pt-0.5">Input fields, value, option</p>
        `
    }
  }
}

export const Rounded: Story = {
  name: 'rounded',
  render: () => {
    return {
      template: `
          <div style="width: 160px; height: 40px" class="rounded border flex justify-center items-center body-sm"> 3px </div>
          <p class="body-sm text-warsaw pt-0.5">Default for buttons, and almost everything else</p>
        `
    }
  }
}

export const RoundedLg: Story = {
  name: 'rounded-lg',
  render: () => {
    return {
      template: `
          <div style="width: 160px; height: 40px" class="rounded-lg border flex justify-center items-center body-sm"> 8px </div>
          <p class="body-sm text-warsaw pt-0.5">Large panels</p>
        `
    }
  }
}

export const RoundedFull: Story = {
  name: 'rounded-full',
  render: () => {
    return {
      template: `
          <div style="width: 160px; height: 40px" class="rounded-full border flex justify-center items-center body-sm"> Fully rounded </div>
          <p class="body-sm text-warsaw pt-0.5">Counter, avatars, pills</p>
        `
    }
  }
}

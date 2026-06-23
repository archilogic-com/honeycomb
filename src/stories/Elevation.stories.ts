import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta = {
  title: 'Primitives/Elevation',
  decorators: [
    () => ({
      template: '<div class="mb-4"><story /></div>'
    })
  ]
}

export default meta

type Story = StoryObj

export const ShadowSm: Story = {
  name: 'shadow-sm',
  render: () => {
    return {
      template: `
          <div style="width: 160px; height: 40px" class="shadow-sm flex justify-center items-center rounded body-sm"> Small </div>
        `
    }
  }
}

export const ShadowMd: Story = {
  name: 'shadow-md',
  render: () => {
    return {
      template: `
          <div  style="width: 224px; height: 80px" class="shadow-md flex justify-center items-center rounded body-md"> Medium </div>
        `
    }
  }
}

export const ShadowLg: Story = {
  name: 'shadow-lg',
  render: () => {
    return {
      template: `
          <div style="width: 448px; height: 160px" class="shadow-lg flex justify-center items-center rounded body-lg"> Large </div>
        `
    }
  }
}

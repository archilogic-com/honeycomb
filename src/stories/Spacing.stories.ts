import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta = {
  title: 'Primitives/Spacing',
  decorators: [
    () => ({
      template: '<div class="grid grid-cols-8 gap-1 body-lg items-top"><story /></div>'
    })
  ]
}

export default meta

type Story = StoryObj

export const Spacing0: Story = {
  name: '0',
  render: () => {
    return {
      template: `
          <div class="col-span-2 w-0 h-0 bg-primary"></div>
          <span>0rem</span>
          <span>0px</span>
          <span class="italic col-span-4">use to remove spacing, i.e \`p-0\` sets padding to 0px</span>
        `
    }
  }
}

export const Spacing1: Story = {
  name: '1',
  render: () => {
    return {
      template: `
          <div class="col-span-2 w-1 h-1 bg-primary"></div>
          <span>0.25rem</span>
          <span>4px</span>
          <span class="italic col-span-4">use only in special cases</span>
        `
    }
  }
}

export const Spacing2: Story = {
  name: '2',
  render: () => {
    return {
      template: `
          <div class="col-span-2 w-2 h-2 bg-primary"></div>
          <span>0.5rem</span>
          <span>8px</span>
        `
    }
  }
}

export const Spacing3: Story = {
  name: '3',
  render: () => {
    return {
      template: `
          <div class="col-span-2 w-3 h-3 bg-primary"></div>
          <span>0.75rem</span>
          <span>12px</span>
          <span class="italic col-span-4"> use only in special cases</span>
        `
    }
  }
}

export const Spacing4: Story = {
  name: '4',
  render: () => {
    return {
      template: `
          <div class="col-span-2 w-4 h-4 bg-primary"></div>
          <span>1rem</span>
          <span>16px</span>
        `
    }
  }
}

export const Spacing6: Story = {
  name: '6',
  render: () => {
    return {
      template: `
          <div class="col-span-2 w-6 h-6 bg-primary"></div>
          <span>1.5rem</span>
          <span>24px</span>
        `
    }
  }
}

export const Spacing8: Story = {
  name: '8',
  render: () => {
    return {
      template: `
          <div class="col-span-2 w-8 h-8 bg-primary"></div>
          <span>2rem</span>
          <span>32px</span>
        `
    }
  }
}

export const Spacing10: Story = {
  name: '10',
  render: () => {
    return {
      template: `
          <div class="col-span-2 w-10 h-10 bg-primary"></div>
          <span>2.5rem</span>
          <span>40px</span>
        `
    }
  }
}

export const Spacing12: Story = {
  name: '12',
  render: () => {
    return {
      template: `
          <div class="col-span-2 w-12 h-12 bg-primary"></div>
          <span>3rem</span>
          <span>48px</span>
        `
    }
  }
}

export const Spacing16: Story = {
  name: '16',
  render: () => {
    return {
      template: `
          <div class="col-span-2 w-16 h-16 bg-primary"></div>
          <span>4rem</span>
          <span>64px</span>
        `
    }
  }
}

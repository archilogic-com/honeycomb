import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ASeparator } from '../components'

const meta: Meta<typeof ASeparator> = {
  title: 'Components/Separator',
  component: ASeparator
}

export default meta

type Story = StoryObj<typeof ASeparator>

export const Horizontal: Story = {
  name: 'horizontal',
  render: () => ({
    components: { ASeparator },
    template: `
      <div>
        <p>Hello</p>
        <a-separator class="my-2"/>
        <p>Bye!</p>
      </div>`
  })
}

export const Vertical: Story = {
  name: 'vertical',
  render: () => ({
    components: { ASeparator },
    template: `
      <div class="flex">
        <p>Hello</p>
        <a-separator orientation="vertical" class="mx-2"/>
        <p>Bye!</p>
      </div>`
  })
}

export const WithPaddingVertical: Story = {
  name: 'with padding vertical',
  render: () => ({
    components: { ASeparator },
    template: `
      <div class="flex border border-warsaw py-2">
        <p>Hello</p>
        <a-separator orientation="vertical" class="mx-2"/>
        <p>Bye!</p>
      </div>`
  })
}

export const WithMarginsVertical: Story = {
  name: 'with margins vertical',
  render: () => ({
    components: { ASeparator },
    template: `
      <div class="flex border border-warsaw">
        <p>Hello</p>
        <a-separator orientation="vertical" class="m-2"/>
        <p>Bye!</p>
      </div>`
  })
}

export const WithPaddingHorizontal: Story = {
  name: 'with padding horizontal',
  render: () => ({
    components: { ASeparator },
    template: `
      <div class="border border-warsaw px-2">
        <p>Hello</p>
        <a-separator class="my-2"/>
        <p>Bye!</p>
      </div>`
  })
}

export const WithMarginsHorizontal: Story = {
  name: 'with margins horizontal',
  render: () => ({
    components: { ASeparator },
    template: `
      <div class="border border-warsaw">
        <p>Hello</p>
        <a-separator class="m-2"/>
        <p>Bye!</p>
      </div>`
  })
}

export const AsProp: Story = {
  name: 'as prop',
  render: () => ({
    components: { ASeparator },
    template: `
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <a-separator as="li" class="my-2"/>
        <li>Item 4</li>
        <li>Item 5</li>
      </ul>`
  })
}

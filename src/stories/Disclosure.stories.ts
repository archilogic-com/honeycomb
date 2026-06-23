import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { within } from 'storybook/test'
import { ref } from 'vue'
import { ADisclosure, AButton } from '../components'

const meta: Meta<typeof ADisclosure> = {
  title: 'Components/Disclosure',
  component: ADisclosure
}

export default meta

type Story = StoryObj<typeof ADisclosure>

export const ClosedByDefault: Story = {
  name: 'closed by default',
  render: () => ({
    components: { ADisclosure },
    template: `
      <div style="width: 200px">
        <ADisclosure title="Options">
          <ul>
            <li>option A</li>
            <li>option B</li>
            <li>option C</li>
          </ul>
        </ADisclosure>
      </div>
      `
  })
}

export const OpenedByDefault: Story = {
  name: 'opened by default',
  render: () => ({
    components: { ADisclosure },
    template: `
      <div style="width: 200px">
        <ADisclosure :open="true" title="Options">
          <ul>
            <li>option A</li>
            <li>option B</li>
            <li>option C</li>
          </ul>
        </ADisclosure>
      </div>
      `
  })
}

export const TitleSlot: Story = {
  name: 'title slot',
  render: () => ({
    components: { ADisclosure },
    template: `
      <div style="width: 200px">
        <ADisclosure>
          <template #title><span class="underline">Options</span></template>
          <ul>
            <li>option A</li>
            <li>option B</li>
            <li>option C</li>
          </ul>
        </ADisclosure>
      </div>
      `
  })
}

export const StateChanges: Story = {
  name: 'state changes',
  render: () => ({
    components: { ADisclosure },
    setup() {
      return {
        isOpen: ref(false)
      }
    },
    template: `
      <span>👇 this section is currently {{ isOpen ? '😳 opened' : '😑 closed' }}</span>
      <div style="width: 200px">
        <ADisclosure @toggle="event => isOpen = event.target.open" title="Options">
          <ul>
            <li>option A</li>
            <li>option B</li>
            <li>option C</li>
          </ul>
        </ADisclosure>
      </div>
      `
  })
}

export const TruncatedTitle: Story = {
  name: 'truncated title',
  render: () => ({
    components: { ADisclosure },
    template: `
      <div style="width: 200px">
        <ADisclosure>
          <template #title>It's supercalifragilisticexpialidocious</template>
          <ul>
            <li>Even though the sound of it</li>
            <li>Is something quite atrocious</li>
          </ul>
        </ADisclosure>
      </div>
      `
  })
}

const clickButton = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement)
  await canvas.getByRole('button').click()
}

export const ExternalTrigger: Story = {
  name: 'external trigger',
  play: clickButton,
  render: () => ({
    components: { ADisclosure, AButton },
    setup() {
      return {
        isOpen: ref(false)
      }
    },
    template: `
      <AButton @click="isOpen = !isOpen">Toggle</AButton>
      <div style="width: 200px">
        <ADisclosure :open="isOpen" title="Options">
          <ul>
            <li>option A</li>
            <li>option B</li>
            <li>option C</li>
          </ul>
        </ADisclosure>
      </div>
      `
  })
}

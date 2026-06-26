import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ATabButton, ASeparator } from '../components'
import { TabGroup, TabList, TabPanels, TabPanel, Tab } from '@headlessui/vue'

const meta: Meta<typeof ATabButton> = {
  title: 'Components/TabButton',
  component: ATabButton
}

export default meta

type Story = StoryObj<typeof ATabButton>

export const TabsExample: Story = {
  name: 'tabs example',
  render: () => ({
    components: { ATabButton, TabGroup, TabList, TabPanels, TabPanel, Tab, ASeparator },
    setup() {
      const tabs = [
        { title: 'First tab', panel: 'First panel' },
        { title: 'Second tab', panel: 'Second panel' }
      ]
      return { tabs }
    },
    template: `
        <TabGroup>
          <TabList>
            <Tab v-slot="{ selected }" as="template" v-for="tab in tabs" :key="tab.title">
              <a-tab-button :selected="selected">
                {{ tab.title }}
              </a-tab-button>
            </Tab>
          </TabList>
          <a-separator />
          <TabPanels class="p-2">
            <TabPanel v-for="tab in tabs">
              {{ tab.panel}}
            </TabPanel>
          </TabPanels>
        </TabGroup>`
  })
}

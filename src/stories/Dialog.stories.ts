import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { ref } from 'vue'
import isChromatic from 'chromatic/isChromatic'
import { ADialog, AButton, AListbox, APanel, ALogo } from '../components'

type DialogArgs = ComponentProps<typeof ADialog> & { slots?: string }

const meta: Meta<DialogArgs> = {
  title: 'Components/Dialog',
  component: ADialog,
  subcomponents: { APanel },
  argTypes: {
    class: {
      control: false
    },
    slots: {
      control: false
    },
    overlay: {
      control: 'boolean'
    }
  }
}

export default meta

type Story = StoryObj<DialogArgs>

const render = (args: DialogArgs) => ({
  components: { ADialog, AButton, AListbox, ALogo },
  setup() {
    const isOpen = ref(false)
    const toggleDialog = (value: boolean) => {
      isOpen.value = value
    }
    return {
      args,
      isOpen,
      toggleDialog,
      isChromatic
    }
  },
  template: `
		<div style="${isChromatic() ? 'width: 1200px; height: 800px' : ''}">
        <a-button variant="primary" class="mt-4" @click="toggleDialog(true)">Open dialog</a-button>
        <ADialog v-bind="args" :open="isChromatic() ? true : isOpen" @close="toggleDialog(false)">
            ${args.slots}
        </ADialog>
		</div>`
})

const defaultArgs = {
  title: 'Do you want to proceed?',
  slots: ` 
    <template #body>
      <p>This cannot be undone</p>	
    </template>
    <template #actions>
      <a-button variant="primary" size="lg" @click="toggleDialog(false)">Confirm</a-button>
      <a-button variant="subtle" size="lg" @click="toggleDialog(false)">Cancel</a-button>
    </template>
  `
}

export const TopVerticalAlignment: Story = {
  name: 'top vertical alignment',
  render,
  args: defaultArgs
}

export const CenterVerticalAlignment: Story = {
  name: 'center vertical alignment',
  render,
  args: {
    ...defaultArgs,
    position: 'center'
  }
}

export const BottomVerticalAlignment: Story = {
  name: 'bottom vertical alignment',
  render,
  args: {
    ...defaultArgs,
    position: 'bottom'
  }
}

export const NoOverlay: Story = {
  name: 'no overlay',
  render,
  args: {
    ...defaultArgs,
    overlay: false
  }
}

export const TitleAndActions: Story = {
  name: 'title and actions',
  render,
  args: defaultArgs
}

export const NoActions: Story = {
  name: 'no actions',
  render,
  args: {
    title: 'Build version',
    slots: `<template #body>220420-112919-be89a7</template>`
  }
}

export const DefaultSlot: Story = {
  name: 'default slot',
  render,
  args: {
    slots: `
      <template #default>
        <div class="flex flex-col">
          <a-logo/>
          <div class="p-4 body-sm">
            <p>You might want to put search in here or display some other helpful info.</p>
            <p>Don't forget to add a focusable element and appropriate padding, ok?</p>
          </div>
          <a-button class="w-full my-4 rounded-none" @click="toggleDialog(false)">Ok</a-button>
        </div>
      </template>`
  }
}

export const ScrollablePanelBody: Story = {
  name: 'scrollable panel body',
  render,
  args: {
    slots: `
      <template #body>
        <p 
          class="bg-athens h-screen flex flex-col items-center justify-center">
          Dialog body
        </p>	
      </template>
      <template #actions>
        <a-button variant="primary" size="lg" @click="toggleDialog(false)">Confirm</a-button>
        <a-button variant="subtle" size="lg" @click="toggleDialog(false)">Cancel</a-button>
      </template>
    `
  }
}

export const ScrollableDefaultSlot: Story = {
  name: 'scrollable default slot',
  render,
  args: {
    slots: `
      <template #default>
        <p 
          class="h-screen flex flex-col items-center justify-center">
          Dialog body
        </p>	
      </template>
    `
  }
}

export const LongTitle: Story = {
  name: 'long title',
  render,
  args: {
    ...defaultArgs,
    title:
      'This is the longest dialog title I have ever seen but I am still struggling to make it wrap onto the next line in chromatic snapshots\nso I added a newline character and whitespace-pre-line class'
  }
}

export const LeftAlignedAction: Story = {
  name: 'left-aligned action',
  render,
  args: {
    title: 'Export data',
    slots: `
      <template #body>
        Please choose a format.
      </template>
      <template #actions>
        <a-button variant="primary" size="lg">Export</a-button>
        <a-button variant="subtle" size="lg" @click="toggleDialog(false)">Cancel</a-button>
        <AListbox
          size="md"
          class="ml-auto"
          placeholder="Export as…"
          :options="[{ value: 'csv', label: '.csv' }, { value: 'xls', label: '.xls' }]"
          direction="up" />
      </template>`
  }
}

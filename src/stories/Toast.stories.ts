import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { ref } from 'vue'
import isChromatic from 'chromatic/isChromatic'

import { AToast, AToastContainer, AButton } from '../components'

type ToastArgs = ComponentProps<typeof AToast> & {
  default?: string
  label?: string
  message?: string
}
type ToastItem = ToastArgs & { id?: number }

const meta: Meta<ToastArgs> = {
  title: 'Components/Toast',
  component: AToast,
  subcomponents: { AToastContainer },
  argTypes: {
    variant: {
      options: ['default', 'warning', 'error'],
      control: 'radio'
    },
    timeout: { control: 'text' },
    dismissible: { control: 'boolean' },
    message: { control: 'text' }
  }
}

export default meta

type Story = StoryObj<ToastArgs>

const render = (args: ToastArgs) => ({
  components: { AToast, AButton },
  setup() {
    return { args }
  },
  template: `
    <AToast v-bind="args" :timeout="0">
    ${args.default || ''}
    </AToast>`
})

const toastStories: Record<string, ToastArgs> = {
  default: {
    label: 'Default',
    default: '23 Hudson Square renamed to Hudson Square'
  },
  warning: {
    label: 'Warning',
    default: 'Connection lost',
    variant: 'warning'
  },
  error: {
    label: 'Error',
    default: 'Failed to archive 3 items',
    variant: 'error'
  },
  dismiss: {
    label: 'Without a close button',
    default: 'Copied to clipboard',
    dismissible: false
  },
  longer: {
    label: 'Custom duration',
    default: 'I will stay a bit longer',
    timeout: 10000
  },
  sticky: {
    label: 'Disabled auto-closing',
    default: "I'm not going anywhere!",
    timeout: 0
  }
}

export const ToastContainer: Story = {
  name: 'toast-container',
  render: () => ({
    components: { AToastContainer, AToast, AButton },
    setup() {
      const toasts = ref<ToastItem[]>([])
      const showToast = (toast: ToastItem) => {
        toast.id = Math.random()
        toasts.value.push(toast)
      }
      const removeToast = (toast: ToastItem) => {
        toasts.value = toasts.value.filter(({ id }) => id !== toast.id)
      }
      if (isChromatic()) {
        Object.values(toastStories).forEach(toast => {
          showToast(toast)
        })
      }
      return {
        toastStories,
        toasts,
        removeToast,
        showToast
      }
    },
    template: `
      <div>
        <div class="flex flex-wrap" v-if="${!isChromatic()}">
          <a-button
            v-for="(toast, key) in toastStories"
            :key="key"
            variant="primary"
            class="m-1"
            @click="showToast(toast)">
            {{ toast.label }}
          </a-button>
        </div>
        <AToastContainer>
          <AToast
            v-for="(toast, key) in toasts"
            :key="toast.id"
            :variant="toast.variant || 'default'"
            :timeout="toast.timeout"
            :dismissible="toast.dismissible"
            @dismiss="removeToast(toast)"
            class="mx-auto my-2">
            {{ toast.default }}
          </AToast>
        </AToastContainer>
      </div>`
  })
}

export const Default: Story = {
  name: 'default',
  render,
  args: toastStories.default
}

export const Warning: Story = {
  name: 'warning',
  render,
  args: toastStories.warning
}

export const Error: Story = {
  name: 'error',
  render,
  args: toastStories.error
}

export const HideCloseButton: Story = {
  name: 'hide close button',
  render,
  args: toastStories.dismiss
}

export const ExternalDismiss: Story = {
  name: 'external dismiss',
  render: () => ({
    components: { AToast, AButton },
    setup() {
      const isOpen = ref(true)
      const hideToast = () => {
        isOpen.value = false
      }
      return {
        isOpen,
        hideToast
      }
    },
    template: `
      <div>
        <a-button
          variant="primary"
          class="m-1"
          @click="hideToast">
          Hide toast
        </a-button>
        <AToast
          :open="isOpen"
          :timeout="0"
          :dismissible="false">
          The button above will dismiss me
        </AToast>
      </div>`
  })
}

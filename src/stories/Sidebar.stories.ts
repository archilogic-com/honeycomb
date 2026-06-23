import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import ASidebar from '../components/Sidebar.vue'

type SidebarArgs = ComponentProps<typeof ASidebar> & { scroll?: boolean }

const meta: Meta<SidebarArgs> = {
  title: 'Components/Sidebar',
  component: ASidebar,
  argTypes: {
    side: {
      options: ['left', 'right'],
      control: 'radio'
    },
    class: { control: false },
    resizable: { control: 'boolean' }
  }
}

export default meta

type Story = StoryObj<SidebarArgs>

const render = (args: SidebarArgs) => ({
  components: { ASidebar },
  inheritAttrs: false,
  setup() {
    return { args }
  },
  template: `
  <div class="h-[500px]">
    <main class="h-full w-full flex overflow-auto">
        <a-sidebar v-bind="args" v-if="args.side === 'left'">
          <p class="heading-sm p-2">
            Sidebar content
          </p>
        </a-sidebar>
        <section class="p-4 flex-grow ">
          <h3 class="heading-md">Main content</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec auctor orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris accumsan in odio sollicitudin aliquam. Donec at laoreet lorem, vel mollis lorem. Vestibulum diam risus, pretium vitae consequat pharetra, vestibulum gravida est. Mauris sit amet vulputate dui, quis interdum eros. Maecenas ornare ultrices arcu. Nulla facilisi. Mauris sed enim ex. 
          </p>
          <p>
            In non porttitor nisl, at dictum purus. Quisque faucibus nibh in magna sollicitudin blandit. Fusce nibh sem, fringilla non convallis non, ullamcorper et ligula. Nam sit amet velit neque. Vivamus lacus tellus, dictum et arcu non, venenatis dignissim sapien. Cras ut odio sodales, dictum mi non, faucibus lectus. Pellentesque quis quam vel eros fermentum porttitor eu vel tellus. Suspendisse potenti. Donec in rhoncus dolor. Praesent sit amet efficitur augue. Maecenas sodales ultricies fermentum.
          </p>
          <p>
            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur nec tellus euismod, rutrum turpis at, sodales elit. Nulla ultricies lorem sed interdum gravida. Phasellus malesuada quis augue ac feugiat. Nulla tincidunt orci non odio faucibus pellentesque. Suspendisse mi ipsum, dignissim ac risus blandit, fringilla sodales lectus. Integer fermentum libero at neque interdum dapibus. Phasellus molestie et sapien nec egestas. 
          </p>
        </section> 
        <a-sidebar v-bind="args" v-if="args.side === 'right'">
          <p class=" heading-sm p-2">
            Sidebar content
          </p>
          <div v-if="args.scroll" class="overflow-auto">
            <div class="h-12 ml-2" v-for="n in 30">test</div>
          </div>
        </a-sidebar>
      </main>
    </div>
  `
})

export const Left: Story = {
  name: 'left',
  render,
  parameters: { layout: 'fullscreen' },
  args: {
    side: 'left'
  }
}

export const Right: Story = {
  name: 'right',
  render,
  parameters: { layout: 'fullscreen' },
  args: {
    side: 'right'
  }
}

export const CustomWidth: Story = {
  name: 'custom width',
  render,
  parameters: { layout: 'fullscreen' },
  args: {
    side: 'left',
    class: 'w-[17rem]'
  }
}

export const ResizableLeft: Story = {
  name: 'resizable left',
  render,
  parameters: { layout: 'fullscreen' },
  args: {
    side: 'left',
    resizable: true
  }
}

export const ResizableRight: Story = {
  name: 'resizable right',
  render,
  parameters: { layout: 'fullscreen' },
  args: {
    side: 'right',
    resizable: true
  }
}

export const ResizableRightScroll: Story = {
  name: 'resizable right scroll',
  render,
  parameters: { layout: 'fullscreen' },
  args: {
    side: 'right',
    resizable: true,
    scroll: true
  }
}

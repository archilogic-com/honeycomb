import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ATopBar from '../components/TopBar.vue'
import AButton from '../components/Button.vue'
import ALogo from '../components/Logo.vue'

const meta: Meta<typeof ATopBar> = {
  title: 'Components/TopBar',
  component: ATopBar
}

export default meta

type Story = StoryObj<typeof ATopBar>

export const Primary: Story = {
  name: 'primary',
  parameters: { layout: 'fullscreen' },
  render: () => ({
    components: { ATopBar, ALogo, AButton },
    template: `
        <section style="height: 400px; overflow: auto;">
          <a-top-bar class="justify-between">
            <a-logo/>
            <a-button variant="primary" size="lg" class="mr-2">Add model</a-button>
          </a-top-bar>
          <section>
            <h3>Scrollable content</h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec auctor orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris accumsan in odio sollicitudin aliquam. Donec at laoreet lorem, vel mollis lorem. Vestibulum diam risus, pretium vitae consequat pharetra, vestibulum gravida est. Mauris sit amet vulputate dui, quis interdum eros. Maecenas ornare ultrices arcu. Nulla facilisi. Mauris sed enim ex. In non porttitor nisl, at dictum purus. Quisque faucibus nibh in magna sollicitudin blandit. Fusce nibh sem, fringilla non convallis non, ullamcorper et ligula. Nam sit amet velit neque. Vivamus lacus tellus, dictum et arcu non, venenatis dignissim sapien. Cras ut odio sodales, dictum mi non, faucibus lectus. Pellentesque quis quam vel eros fermentum porttitor eu vel tellus. Suspendisse potenti. Donec in rhoncus dolor. Praesent sit amet efficitur augue. Maecenas sodales ultricies fermentum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur nec tellus euismod, rutrum turpis at, sodales elit. Nulla ultricies lorem sed interdum gravida. Phasellus malesuada quis augue ac feugiat. Nulla tincidunt orci non odio faucibus pellentesque. Suspendisse mi ipsum, dignissim ac risus blandit, fringilla sodales lectus. Integer fermentum libero at neque interdum dapibus. Phasellus molestie et sapien nec egestas. Vivamus gravida ex sapien, tempor feugiat quam rhoncus in. Donec congue orci eu augue lobortis, ac fringilla est tincidunt. Ut vitae ligula ut libero porttitor pretium ac vel leo. Phasellus mattis lacus sed urna lacinia rutrum at at velit. Aliquam erat volutpat. Ut sed placerat ante. Vivamus maximus venenatis lacus, a consectetur leo mollis at. Etiam facilisis enim nec odio dictum blandit. Donec varius, purus sollicitudin pulvinar ultrices, eros sem accumsan nunc, in hendrerit metus quam nec mi. Praesent volutpat vestibulum pharetra. Etiam orci odio, lacinia quis gravida eget, ultrices at diam. Vivamus tellus augue, feugiat quis volutpat sed, varius sit amet erat. Quisque in laoreet tortor. Maecenas vel vehicula tortor, molestie iaculis arcu. Donec ac eros luctus, vestibulum nulla non, sagittis turpis. Donec eros nunc, porttitor a fermentum eu, interdum eget tortor. Fusce viverra malesuada condimentum. Fusce vel lectus facilisis, semper lectus ac, rhoncus odio. Phasellus fermentum ante risus, vitae aliquam sapien vulputate in. Sed vitae tincidunt odio, a pellentesque mi. Mauris aliquet mollis eros malesuada maximus. Aliquam vel elit ipsum. Sed finibus vitae libero vel mattis. Ut pellentesque ex magna, sit amet vestibulum risus tincidunt quis. Nulla in lacus aliquet, pulvinar lorem vitae, volutpat neque. Etiam in velit vitae augue dictum elementum. Etiam congue sed eros at cursus. Integer ut diam felis. Aenean vehicula mattis congue. Mauris ac rhoncus tortor. Aliquam eu convallis odio. Pellentesque sit amet tellus et nulla finibus lobortis ac ut turpis. Pellentesque et posuere est. Nunc pulvinar eget diam id viverra. Sed justo mi, varius varius tortor et, laoreet sagittis ipsum. Suspendisse potenti. Fusce id lorem sit amet lorem placerat sollicitudin. Nullam laoreet elementum augue vel ullamcorper. Vestibulum ultrices dapibus mollis. Phasellus elementum in nulla ac rutrum. Sed at ex in lorem gravida ullamcorper et nec felis. Suspendisse in lacus dictum, cursus turpis vestibulum, suscipit neque. Nam pellentesque vitae justo quis tempor. Nam eleifend eu ante ut dictum.
          </section>
        </section>
      `
  })
}

export const Secondary: Story = {
  name: 'secondary',
  parameters: { layout: 'fullscreen' },
  render: () => ({
    components: { ATopBar, ALogo, AButton },
    template: `
         <a-top-bar class="justify-between">
            <a-logo/>
            <a-button variant="primary" size="lg" class="mr-2">Add model</a-button>
         </a-top-bar>
         <main class="flex" style="height: 400px;">
           <section class="w-1/3 border-r border-gray">Sidebar content</section>
           <section class="w-2/3 overflow-auto">
            <a-top-bar>
              <h2 class="body-lg-600 px-4">Floors</h2>
              <a-button class="ml-2">Filters</a-button>
              <a-button class="ml-auto mr-2">Open in Editor</a-button>
            </a-top-bar>
            <div>
              <h3>Scrollable content</h3>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec auctor orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris accumsan in odio sollicitudin aliquam. Donec at laoreet lorem, vel mollis lorem. Vestibulum diam risus, pretium vitae consequat pharetra, vestibulum gravida est. Mauris sit amet vulputate dui, quis interdum eros. Maecenas ornare ultrices arcu. Nulla facilisi. Mauris sed enim ex. In non porttitor nisl, at dictum purus. Quisque faucibus nibh in magna sollicitudin blandit. Fusce nibh sem, fringilla non convallis non, ullamcorper et ligula. Nam sit amet velit neque. Vivamus lacus tellus, dictum et arcu non, venenatis dignissim sapien. Cras ut odio sodales, dictum mi non, faucibus lectus. Pellentesque quis quam vel eros fermentum porttitor eu vel tellus. Suspendisse potenti. Donec in rhoncus dolor. Praesent sit amet efficitur augue. Maecenas sodales ultricies fermentum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur nec tellus euismod, rutrum turpis at, sodales elit. Nulla ultricies lorem sed interdum gravida. Phasellus malesuada quis augue ac feugiat. Nulla tincidunt orci non odio faucibus pellentesque. Suspendisse mi ipsum, dignissim ac risus blandit, fringilla sodales lectus. Integer fermentum libero at neque interdum dapibus. Phasellus molestie et sapien nec egestas. Vivamus gravida ex sapien, tempor feugiat quam rhoncus in. Donec congue orci eu augue lobortis, ac fringilla est tincidunt. Ut vitae ligula ut libero porttitor pretium ac vel leo. Phasellus mattis lacus sed urna lacinia rutrum at at velit. Aliquam erat volutpat. Ut sed placerat ante. Vivamus maximus venenatis lacus, a consectetur leo mollis at. Etiam facilisis enim nec odio dictum blandit. Donec varius, purus sollicitudin pulvinar ultrices, eros sem accumsan nunc, in hendrerit metus quam nec mi. Praesent volutpat vestibulum pharetra. Etiam orci odio, lacinia quis gravida eget, ultrices at diam. Vivamus tellus augue, feugiat quis volutpat sed, varius sit amet erat. Quisque in laoreet tortor. Maecenas vel vehicula tortor, molestie iaculis arcu. Donec ac eros luctus, vestibulum nulla non, sagittis turpis. Donec eros nunc, porttitor a fermentum eu, interdum eget tortor. Fusce viverra malesuada condimentum. Fusce vel lectus facilisis, semper lectus ac, rhoncus odio. Phasellus fermentum ante risus, vitae aliquam sapien vulputate in. Sed vitae tincidunt odio, a pellentesque mi. Mauris aliquet mollis eros malesuada maximus. Aliquam vel elit ipsum. Sed finibus vitae libero vel mattis. Ut pellentesque ex magna, sit amet vestibulum risus tincidunt quis. Nulla in lacus aliquet, pulvinar lorem vitae, volutpat neque. Etiam in velit vitae augue dictum elementum. Etiam congue sed eros at cursus. Integer ut diam felis. Aenean vehicula mattis congue. Mauris ac rhoncus tortor. Aliquam eu convallis odio. Pellentesque sit amet tellus et nulla finibus lobortis ac ut turpis. Pellentesque et posuere est. Nunc pulvinar eget diam id viverra. Sed justo mi, varius varius tortor et, laoreet sagittis ipsum. Suspendisse potenti. Fusce id lorem sit amet lorem placerat sollicitudin. Nullam laoreet elementum augue vel ullamcorper. Vestibulum ultrices dapibus mollis. Phasellus elementum in nulla ac rutrum. Sed at ex in lorem gravida ullamcorper et nec felis. Suspendisse in lacus dictum, cursus turpis vestibulum, suscipit neque. Nam pellentesque vitae justo quis tempor. Nam eleifend eu ante ut dictum.
            </div>
            </section>
         </main>
        `
  })
}

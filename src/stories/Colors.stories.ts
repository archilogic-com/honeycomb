import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta = {
  title: 'Primitives/Colors',
  decorators: [
    () => ({
      template: `
      <div style="width: 128px" class="relative">
        <div
          class="rounded-full w-16 h-16"
          style="border-right: 32px solid white;
            background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),linear-gradient(135deg, #ccc 25%, transparent 25%),linear-gradient(45deg, transparent 75%, #ccc 75%),linear-gradient(135deg, transparent 75%, #ccc 75%);
            background-size:6px 6px;
            transform: rotateZ(225deg)">
        </div>
        <story/>
      </div>`
    })
  ]
}

export default meta

type Story = StoryObj

export const Primary: Story = {
  name: 'primary',
  render: () => ({
    template: `
          <div class="bg-primary w-16 h-16 mb-0.5 rounded-full absolute top-0"></div>
          <p class="body-lg-600">Primary</p>
          <p class="body-lg">#1414c1</p>
        `
  })
}

export const Navy: Story = {
  name: 'navy',
  render: () => ({
    template: `
          <div class="bg-navy w-16 h-16 mb-0.5 rounded-full absolute top-0"></div>
          <p class="body-lg-600 capitalize">navy</p>
          <p class="body-lg">#172c4d</p>
        `
  })
}

export const White: Story = {
  name: 'white',
  render: () => ({
    template: `
          <div class="bg-white w-16 h-16 mb-0.5 rounded-full absolute top-0 border"></div>
          <p class="body-lg-600 capitalize">white</p>
          <p class="body-lg">#ffffff</p>
        `
  })
}

export const Newyork: Story = {
  name: 'newyork',
  render: () => ({
    template: `
          <div class="bg-newyork w-16 h-16 mb-0.5 rounded-full absolute top-0 absolute"></div>
          <p class="body-lg-600 capitalize">new york</p>
          <p class="body-lg">#0c1829</p>
        `
  })
}

export const Stone: Story = {
  name: 'stone',
  render: () => ({
    template: `
          <div class="bg-stone w-16 h-16 mb-0.5 rounded-full absolute top-0"></div>
          <p class="body-lg-600 capitalize">stone</p>
          <p class="body-lg">#4d586b</p>
        `
  })
}

export const Warsaw: Story = {
  name: 'warsaw',
  render: () => ({
    template: `
          <div class="bg-warsaw w-16 h-16 mb-0.5 rounded-full absolute top-0"></div>
          <p class="body-lg-600 capitalize">warsaw</p>
          <p class="body-lg">#929baa</p>
        `
  })
}

export const Oslo: Story = {
  name: 'oslo',
  render: () => ({
    template: `
          <div class="bg-oslo w-16 h-16 mb-0.5 rounded-full absolute top-0"></div>
          <p class="body-lg-600 capitalize">oslo</p>
          <p class="body-lg">#72849e</p>
        `
  })
}

export const Stone8: Story = {
  name: 'stone8',
  render: () => ({
    template: `
          <div class="bg-stone8 w-16 h-16 mb-0.5 rounded-full absolute top-0"></div>
          <p class="body-lg-600 capitalize">stone .08</p>
          <p class="body-lg">#4Dd86b .08</p>
        `
  })
}

export const Stone16: Story = {
  name: 'stone16',
  render: () => ({
    template: `
          <div class="bg-stone16 w-16 h-16 mb-0.5 rounded-full absolute top-0"></div>
          <p class="body-lg-600 capitalize">stone .16</p>
          <p class="body-lg">#4d586b .16</p>
        `
  })
}

export const Gray: Story = {
  name: 'gray',
  render: () => ({
    template: `
          <div class="bg-gray w-16 h-16 mb-0.5 rounded-full absolute top-0"></div>
          <p class="body-lg-600 capitalize">gray</p>
          <p class="body-lg">#cfd5de</p>
        `
  })
}

export const Athens: Story = {
  name: 'athens',
  render: () => ({
    template: `
          <div class="bg-athens w-16 h-16 mb-0.5 rounded-full absolute top-0"></div>
          <p class="body-lg-600 capitalize">athens</p>
          <p class="body-lg">#e8ebef</p>
        `
  })
}

export const Whisper: Story = {
  name: 'whisper',
  render: () => ({
    template: `
          <div class="bg-whisper w-16 h-16 mb-0.5 rounded-full absolute top-0"></div>
          <p class="body-lg-600 capitalize">whisper</p>
          <p class="body-lg">#f7f8fa</p>
        `
  })
}

export const PrimarySubtle: Story = {
  name: 'primary-subtle',
  render: () => ({
    template: `
          <div class="bg-primary-subtle w-16 h-16 mb-0.5 rounded-full absolute top-0"></div>
          <p class="body-lg-600">Primary subtle</p>
          <p class="body-lg">#bdd7ff</p>
        `
  })
}

export const PrimaryHover: Story = {
  name: 'primary-hover',
  render: () => ({
    template: `
          <div class="bg-primary-hover w-16 h-16 mb-0.5 rounded-full absolute top-0"></div>
          <p class="body-lg-600">Primary hover</p>
          <p class="body-lg">#3355ff</p>
        `
  })
}

export const PrimaryActive: Story = {
  name: 'primary-active',
  render: () => ({
    template: `
          <div class="bg-primary-active w-16 h-16 mb-0.5 rounded-full absolute top-0"></div>
          <p class="body-lg-600">Primary active</p>
          <p class="body-lg">#000099</p>
        `
  })
}

export const PrimarySubtleAlpha: Story = {
  name: 'primary-subtle-alpha',
  render: () => ({
    template: `
          <div class="bg-primary-subtle-alpha w-16 h-16 mb-0.5 rounded-full absolute top-0"></div>
          <p class="body-lg-600">Primary subtle .48</p>
          <p class="body-lg">#bdd7ff .48</p>
        `
  })
}

export const Error: Story = {
  name: 'error',
  render: () => ({
    template: `
          <div class="bg-error w-16 h-16 mb-0.5 rounded-full absolute top-0"></div>
          <p class="body-lg-600 capitalize">error</p>
          <p class="body-lg">#ab220a</p>
        `
  })
}

export const Warning: Story = {
  name: 'warning',
  render: () => ({
    template: `
          <div class="bg-warning w-16 h-16 mb-0.5 rounded-full absolute top-0"></div>
          <p class="body-lg-600 capitalize">warning</p>
          <p class="body-lg">#ffc400</p>
        `
  })
}

export const Zurich: Story = {
  name: 'zurich',
  render: () => ({
    template: `
          <div class="bg-zurich w-16 h-16 mb-0.5 rounded-full absolute top-0"></div>
          <p class="body-lg-600">Zurich</p>
          <p class="body-lg">#bdd7ff</p>
        `
  })
}

export const Blueribbon: Story = {
  name: 'blueribbon',
  render: () => ({
    template: `
          <div class="bg-blueribbon w-16 h-16 mb-0.5 rounded-full absolute top-0"></div>
          <p class="body-lg-600">Blue ribbon</p>
          <p class="body-lg">#3355ff</p>
        `
  })
}

export const Darkblue: Story = {
  name: 'darkblue',
  render: () => ({
    template: `
          <div class="bg-darkblue w-16 h-16 mb-0.5 rounded-full absolute top-0"></div>
          <p class="body-lg-600">Dark blue</p>
          <p class="body-lg">#000099</p>
        `
  })
}

export const Zurich48: Story = {
  name: 'zurich48',
  render: () => ({
    template: `
          <div class="bg-zurich48 w-16 h-16 mb-0.5 rounded-full absolute top-0"></div>
          <p class="body-lg-600">Zurich .48</p>
          <p class="body-lg">#bdd7ff .48</p>
        `
  })
}

export const Mediumblue: Story = {
  name: 'mediumblue',
  render: () => ({
    template: `
          <div class="bg-mediumblue w-16 h-16 mb-0.5 rounded-full absolute top-0"></div>
          <p class="body-lg-600">Medium blue</p>
          <p class="body-lg">#1414c1</p>
        `
  })
}

export const Sanfran: Story = {
  name: 'sanfran',
  render: () => ({
    template: `
          <div class="bg-sanfran w-16 h-16 mb-0.5 rounded-full absolute top-0"></div>
          <p class="body-lg-600 capitalize">san fran</p>
          <p class="body-lg">#54c072</p>
        `
  })
}

export const Orange: Story = {
  name: 'orange',
  render: () => ({
    template: `
          <div class="bg-orange w-16 h-16 mb-0.5 rounded-full absolute top-0"></div>
          <p class="body-lg-600 capitalize">orange</p>
          <p class="body-lg">#ffab00</p>
        `
  })
}

export const Purple: Story = {
  name: 'purple',
  render: () => ({
    template: `
          <div class="bg-purple w-16 h-16 mb-0.5 rounded-full absolute top-0"></div>
          <p class="body-lg-600 capitalize">purple</p>
          <p class="body-lg">#6700ab</p>
        `
  })
}

export const Fandango: Story = {
  name: 'fandango',
  render: () => ({
    template: `
          <div class="bg-fandango w-16 h-16 mb-0.5 rounded-full absolute top-0"></div>
          <p class="body-lg-600 capitalize">fandango</p>
          <p class="body-lg">#c40096</p>
        `
  })
}

export const Dodger: Story = {
  name: 'dodger',
  render: () => ({
    template: `
          <div class="bg-dodger w-16 h-16 mb-0.5 rounded-full absolute top-0"></div>
          <p class="body-lg-600 capitalize">dodger</p>
          <p class="body-lg">#007aff</p>
        `
  })
}

export const Flamingo: Story = {
  name: 'flamingo',
  render: () => ({
    template: `
          <div class="bg-flamingo w-16 h-16 mb-0.5 rounded-full absolute top-0"></div>
          <p class="body-lg-600 capitalize">flamingo</p>
          <p class="body-lg">#ef5533</p>
        `
  })
}

export const Aqua: Story = {
  name: 'aqua',
  render: () => ({
    template: `
          <div class="bg-aqua w-16 h-16 mb-0.5 rounded-full absolute top-0"></div>
          <p class="body-lg-600 capitalize">aqua</p>
          <p class="body-lg">#00b5ce</p>
        `
  })
}

export const Palegreen: Story = {
  name: 'palegreen',
  render: () => ({
    template: `
          <div class="bg-palegreen w-16 h-16 mb-0.5 rounded-full absolute top-0"></div>
          <p class="body-lg-600 capitalize">palegreen</p>
          <p class="body-lg">#ffeae6</p>
        `
  })
}

export const Palered: Story = {
  name: 'palered',
  render: () => ({
    template: `
          <div class="bg-palered w-16 h-16 mb-0.5 rounded-full absolute top-0"></div>
          <p class="body-lg-600 capitalize">palered</p>
          <p class="body-lg">#e6ffed</p>
        `
  })
}

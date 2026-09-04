import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { computed, ref } from 'vue'
import { ASlider, AInputGroup, ANumberInput, AHelperText } from '../components'
import { sliderBoundsOver } from '../composables'
import type { SliderModelValue, SliderThumbValue } from '../components'

type SliderProps = ComponentProps<typeof ASlider>

const meta: Meta<SliderProps> = {
  component: ASlider,
  title: 'Components/Slider',
  args: {
    modelValue: 40,
    min: 0,
    max: 100,
    step: 1
  },
  argTypes: {
    modelValue: { control: false },
    formatValue: { control: false },
    marks: { control: false }
  },
  decorators: [() => ({ template: '<div class="w-[420px] p-4"><story /></div>' })]
}

export default meta

type Story = StoryObj<SliderProps>

const renderSlider = (args: SliderProps) => ({
  components: { ASlider },
  setup() {
    const value = ref<SliderModelValue>(args.modelValue)
    return { args, value }
  },
  template: `<ASlider v-bind="args" v-model="value" aria-label="Example slider" />`
})

export const Single: Story = {
  render: renderSlider
}

export const Range: Story = {
  render: renderSlider,
  args: {
    modelValue: [25, 70]
  }
}

export const Disabled: Story = {
  render: renderSlider,
  args: {
    disabled: true
  }
}

export const Invalid: Story = {
  render: renderSlider,
  args: {
    modelValue: [25, 70],
    invalid: true
  }
}

/** `'mixed'` works like the mixed state of `AToggle`: the values behind the control differ,
 *  so there is nothing to point at until the user sets one. */
export const Mixed: Story = {
  render: renderSlider,
  args: {
    modelValue: 'mixed'
  }
}

/** A bearing is an offset in either direction, so the fill grows from the center. */
export const CenterOrigin: Story = {
  render: renderSlider,
  args: {
    modelValue: -90,
    min: -180,
    max: 180,
    origin: 'center',
    marks: [
      { value: -180, label: '-180°' },
      { value: 0, label: '0°' },
      { value: 180, label: '180°' }
    ]
  }
}

export const WithMarks: Story = {
  render: renderSlider,
  args: {
    modelValue: 50,
    step: 25,
    marks: [
      { value: 0, label: 'None' },
      { value: 25 },
      { value: 50, label: 'Half' },
      { value: 75 },
      { value: 100, label: 'All' }
    ],
    formatValue: (value: SliderThumbValue) => `${value}%`
  }
}

/** Pairing the slider with a number input is recommended. A slider alone cannot hit an
 *  exact value, and a range slider on its own is easily mistaken for a single-value one. */
export const WithNumberInput: Story = {
  render: () => ({
    components: { ASlider, ANumberInput, AInputGroup },
    setup() {
      const opacity = ref<SliderModelValue>(0.4)
      return { opacity }
    },
    template: `
      <AInputGroup label="Opacity" helper="Drag for a rough value, type for an exact one">
        <template #input="{ labelledby }">
          <ASlider
            v-model="opacity"
            :min="0"
            :max="1"
            :step="0.01"
            :aria-labelledby="labelledby"
            :formatValue="value => Math.round(value * 100) + '%'">
            <template #input="{ values, min, max, step, setValue }">
              <div class="w-20">
                <ANumberInput
                  :modelValue="values[0]"
                  :min="min"
                  :max="max"
                  :step="step"
                  aria-label="Opacity value"
                  @update:model-value="value => setValue(0, value)" />
              </div>
            </template>
          </ASlider>
        </template>
      </AInputGroup>`
  })
}

/** A range gets two inputs, one per thumb. With a single field it reads as a single value. */
export const RangeWithInputs: Story = {
  render: () => ({
    components: { ASlider, ANumberInput, AInputGroup },
    setup() {
      const height = ref<SliderModelValue>([40, 180])
      return { height }
    },
    template: `
      <AInputGroup label="Height (cm)">
        <template #input="{ labelledby }">
          <ASlider
            v-model="height"
            :min="0"
            :max="300"
            :step="5"
            :minStepsBetweenThumbs="1"
            :aria-labelledby="labelledby">
            <template #input="{ values, min, max, step, setValue }">
              <div class="flex items-center gap-2">
                <div class="w-20">
                  <ANumberInput
                    :modelValue="values[0]"
                    :min="min"
                    :max="max"
                    :step="step"
                    aria-label="Minimum height"
                    @update:model-value="value => setValue(0, value)" />
                </div>
                <div class="w-20">
                  <ANumberInput
                    :modelValue="values[1]"
                    :min="min"
                    :max="max"
                    :step="step"
                    aria-label="Maximum height"
                    @update:model-value="value => setValue(1, value)" />
                </div>
              </div>
            </template>
          </ASlider>
        </template>
      </AInputGroup>`
  })
}

/** The `#thumb-label` slot renders once per thumb in a row below the track. A subtle
 *  `ANumberInput` looks like a label until it is focused. It is pulled left by the input's
 *  9px inset (8px padding plus a 1px border) so that its text lines up with the end of the
 *  track. */
export const WithEditableLabels: Story = {
  render: () => ({
    components: { ASlider, ANumberInput },
    setup() {
      const angle = ref<SliderModelValue>(45)
      return { angle }
    },
    template: `
      <ASlider v-model="angle" :min="0" :max="360" :step="5" aria-label="Angle">
        <template #thumb-label="{ value, index, min, max, step, setValue }">
          <div class="-ml-[9px] w-16">
            <ANumberInput
              :modelValue="value"
              :min="min"
              :max="max"
              :step="step"
              variant="subtle"
              aria-label="Angle value"
              @update:model-value="next => setValue(index, next)" />
          </div>
        </template>
      </ASlider>`
  })
}

/** On a range the two fields sit at the ends of the track, so each one stays where it can
 *  be clicked again. */
export const RangeWithEditableLabels: Story = {
  render: () => ({
    components: { ASlider, ANumberInput, AInputGroup },
    setup() {
      const price = ref<SliderModelValue>([200, 750])
      return { price }
    },
    template: `
      <AInputGroup label="Price">
        <template #input="{ labelledby }">
          <ASlider
            v-model="price"
            :min="0"
            :max="1000"
            :step="10"
            :minStepsBetweenThumbs="1"
            :aria-labelledby="labelledby">
            <template #thumb-label="{ value, index, min, max, step, setValue }">
              <div class="w-20" :class="index === 0 ? '-ml-[9px]' : '-mr-[9px]'">
                <ANumberInput
                  :modelValue="value"
                  :min="min"
                  :max="max"
                  :step="step"
                  variant="subtle"
                  :class="index === 1 && 'text-right'"
                  :aria-label="index === 0 ? 'Minimum price' : 'Maximum price'"
                  @update:model-value="next => setValue(index, next)" />
              </div>
            </template>
          </ASlider>
        </template>
      </AInputGroup>`
  })
}

/** A thumb resting against its outer end emits `undefined`, meaning no limit on that side.
 *  This is the shape that filter values take. */
export const OpenEnded: Story = {
  render: () => ({
    components: { ASlider, AHelperText },
    setup() {
      const area = ref<SliderModelValue>([undefined, undefined])
      const summary = computed(() => {
        const [from, to] = area.value as [SliderThumbValue, SliderThumbValue]
        if (from === undefined && to === undefined) return 'Any area'
        if (from === undefined) return `Up to ${to} m²`
        if (to === undefined) return `${from} m² and above`
        return `${from}–${to} m²`
      })
      return { area, summary }
    },
    template: `
      <div class="flex flex-col gap-2">
        <ASlider
          v-model="area"
          :min="0"
          :max="200"
          :step="10"
          openEnded
          aria-label="Area"
          :formatValue="(value, index) =>
            value !== undefined ? value + ' m²' : (index === 0 ? 'No minimum' : 'No maximum')"
          :marks="[{ value: 0, label: 'Any' }, { value: 200, label: '200+' }]" />
        <AHelperText>{{ summary }}</AHelperText>
      </div>`
  })
}

/** Dragging stays within `min` and `max`, while typing can reach the hard limits. Beyond
 *  the end of the track the thumb parks there. */
export const SoftAndHardLimits: Story = {
  render: () => ({
    components: { ASlider, ANumberInput, AInputGroup, AHelperText },
    setup() {
      const scale = ref<SliderModelValue>(1)
      return { scale }
    },
    template: `
      <AInputGroup label="Scale" helper="Drag between 0 and 2; type anything from -10 to 10">
        <template #input="{ labelledby }">
          <ASlider
            v-model="scale"
            :min="0"
            :max="2"
            :hardMin="-10"
            :hardMax="10"
            :step="0.1"
            :aria-labelledby="labelledby">
            <template #input="{ values, min, max, step, setValue }">
              <div class="w-24">
                <ANumberInput
                  :modelValue="values[0]"
                  :min="min"
                  :max="max"
                  :step="step"
                  aria-label="Scale value"
                  @update:model-value="value => setValue(0, value)" />
              </div>
            </template>
          </ASlider>
        </template>
      </AInputGroup>`
  })
}

/** `sliderBoundsOver` covers the bulk of the values, so the single 58 m outlier parks past
 *  the end of the track instead of squeezing all other widths into its start. */
export const OverData: Story = {
  render: () => ({
    components: { ASlider, AHelperText },
    setup() {
      const widths = [...Array.from({ length: 99 }, (_, index) => 0.4 + index * 0.02), 58]
      const bounds = sliderBoundsOver(widths)
      const range = ref<SliderModelValue>([undefined, undefined])
      const matching = computed(() => {
        const [from, to] = range.value as [SliderThumbValue, SliderThumbValue]
        return widths.filter(width => (from ?? -Infinity) <= width && width <= (to ?? Infinity))
          .length
      })
      return { widths, bounds, range, matching }
    },
    template: `
      <div class="flex flex-col gap-2">
        <ASlider
          v-model="range"
          v-bind="bounds"
          openEnded
          aria-label="Width"
          :formatValue="(value, index) =>
            value !== undefined ? value + ' m' : (index === 0 ? 'No minimum' : 'No maximum')" />
        <AHelperText>
          {{ matching }} of {{ widths.length }} widths · track to {{ bounds.max }} m in steps of
          {{ bounds.step }} m
        </AHelperText>
      </div>`
  })
}

/** `push` (the default) moves the other thumb along, `none` stops at it, and `swap` lets
 *  the thumbs pass each other. */
export const ThumbCollision: Story = {
  render: () => ({
    components: { ASlider },
    setup() {
      const push = ref<SliderModelValue>([40, 60])
      const none = ref<SliderModelValue>([40, 60])
      const swap = ref<SliderModelValue>([40, 60])
      return { push, none, swap }
    },
    template: `
      <div class="flex flex-col gap-6">
        <div>
          <p class="body-xs pb-1 text-stone" id="collision-push">push (default)</p>
          <ASlider v-model="push" thumbCollision="push" aria-labelledby="collision-push" />
        </div>
        <div>
          <p class="body-xs pb-1 text-stone" id="collision-none">none</p>
          <ASlider v-model="none" thumbCollision="none" aria-labelledby="collision-none" />
        </div>
        <div>
          <p class="body-xs pb-1 text-stone" id="collision-swap">swap</p>
          <ASlider v-model="swap" thumbCollision="swap" aria-labelledby="collision-swap" />
        </div>
      </div>`
  })
}

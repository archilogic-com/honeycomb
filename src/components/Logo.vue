<script lang="ts">
import { defineComponent, PropType, capitalize as capitalizeFirstLetter } from 'vue'
import logos from './logos'

export default defineComponent({
  name: 'ALogo',
  props: {
    /**
     * logo variant
     *
     * together with the size identifies the correct logo to load
     *
     * default variant currently comes in one size only
     */
    variant: {
      type: String as PropType<'mark' | 'default'>,
      default: 'default'
    },
    /**
     * logo size for "mark" variant
     *
     * together with the size identifies the correct logo to load
     *
     * default variant currently comes in one size only
     */
    size: {
      type: String as PropType<'sm' | 'md' | 'lg' | ''>,
      default: ''
    },
    /**
     * logo color
     *
     * per [brand guidelines](https://www.notion.so/archilogic/Logos-492d1893c73b4f6c836c7a3a57911e0f), the only supported colors are black (`newyork`) and white
     */
    color: {
      type: String as PropType<'dark' | 'light'>,
      default: 'dark'
    }
  },
  computed: {
    logoComponent() {
      const variant = capitalizeFirstLetter(this.variant)
      const size = capitalizeFirstLetter(this.size)
      return logos[`${variant}${size}`]
    },
    logoColorClass() {
      return this.color === 'dark' ? 'text-newyork' : 'text-white'
    }
  }
})
</script>
<template>
  <component :is="logoComponent" aria-label="Archilogic logo" :class="logoColorClass" />
</template>

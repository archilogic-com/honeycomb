<script lang="ts">
import { defineComponent, PropType, capitalize as capitalizeFirstLetter } from 'vue'
import icons, { IconSize, DEPRECATED_ICONS } from './icons'

export default defineComponent({
  name: 'AIcon',
  props: {
    /**
     * icon name in PascalCase (e.g. ArrowDown, Warning) or camelCase (e.g. arrowDown, warning)
     * together with the size identifies the correct icon to load
     */
    name: {
      type: String,
      required: true
    },
    /**
     * icon size - used to set width and height on an `svg` element
     * currently used sizes: `sm`: 1rem/16px, `md` (default): 2rem/32px, `lg`: 2.5rem/40px, `other`: various sizes for special cases
     */
    size: {
      type: String as PropType<IconSize>,
      default: 'md'
    }
  },
  computed: {
    iconComponent() {
      // need to use the props directly inside the computed function,
      // so that Vue tracks changes
      // https://stackoverflow.com/a/58577362/6917800
      const size = this.size
      const name = capitalizeFirstLetter(this.name) // allow camelCase name
      if (DEPRECATED_ICONS[size].includes(name)) {
        console.warn(
          `Icon "${name}" in size "${size}" is deprecated and will be removed in the next major version.
          Use another supported size or alternative icon, see storybook docs https://honeycomb.archilogic.com`
        )
      }
      if (icons[size][name]) {
        return icons[size][name]
      } else {
        console.error(`Icon ${name} of size ${size} does not exist.`, 'Available icons', icons)
        return null
      }
    }
  }
})
</script>
<template>
  <component :is="iconComponent" v-if="iconComponent" aria-hidden class="flex-shrink-0" />
</template>

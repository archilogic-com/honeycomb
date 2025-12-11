<script lang="ts">
export type {
  IconSize,
  IconName,
  SmIcon,
  MdIcon,
  LgIcon,
  OtherIcon,
  AnyIconName
} from './icons/types'
</script>

<script setup lang="ts">
import { computed, capitalize as capitalizeFirstLetter } from 'vue'
import icons, { DEPRECATED_ICONS } from './icons'
import { type IconSize, type AnyIconName } from './icons/types'

const props = withDefaults(
  defineProps<{
    /**
     * icon name in PascalCase (e.g. ArrowDown, Warning) or camelCase (e.g. arrowDown, warning)
     * together with the size identifies the correct icon to load
     */
    name: AnyIconName
    /**
     * icon size - used to set width and height on an `svg` element
     * currently used sizes: `sm`: 1rem/16px, `md` (default): 2rem/32px, `lg`: 2.5rem/40px, `other`: various sizes for special cases
     */
    size?: IconSize
  }>(),
  {
    size: 'md'
  }
)

const iconComponent = computed(() => {
  const size = props.size
  const name = capitalizeFirstLetter(props.name)
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
})
</script>
<template>
  <component :is="iconComponent" v-if="iconComponent" aria-hidden class="flex-shrink-0" />
</template>

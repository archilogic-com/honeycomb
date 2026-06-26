<script lang="ts">
export type {
  IconSize,
  IconName,
  SmIcon,
  MdIcon,
  LgIcon,
  OtherIcon,
  AnyIcon,
  AnyIconName,
  IconIdentifier,
  SmIconId,
  MdIconId,
  LgIconId,
  OtherIconId
} from './icons/types'
</script>

<script setup lang="ts">
import { computed } from 'vue'
import icons from './icons'
import { type IconSize, type IconIdentifier } from './icons/types'

defineOptions({
  name: 'AIcon'
})

const props = defineProps<{
  /**
   * Type-safe icon identifier in format "name-size" (e.g., "search-sm", "check-md").
   * Enforces valid name+size combinations at the type level.
   */
  icon?: IconIdentifier
}>()

const iconComponent = computed(() => {
  if (!props.icon) {
    console.error('a-icon: the "icon" prop is required')
    return null
  }

  const lastDash = props.icon.lastIndexOf('-')
  const size = props.icon.slice(lastDash + 1) as IconSize
  const name = props.icon
    .slice(0, lastDash)
    .split('-')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')

  if (icons[size][name]) {
    return icons[size][name]
  } else {
    console.error(`Icon ${name} of size ${size} does not exist.`, 'Available icons', icons)
    return null
  }
})
</script>

<template>
  <component :is="iconComponent" v-if="iconComponent" aria-hidden class="shrink-0" />
</template>

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
import icons, { DEPRECATED_ICONS } from './icons'
import { type IconSize, type IconIdentifier, type AnyIconName } from './icons/types'

defineOptions({
  name: 'AIcon'
})

const props = withDefaults(
  defineProps<{
    /**
     * Type-safe icon identifier in format "name-size" (e.g., "search-sm", "check-md").
     * This is the recommended way to specify icons as it enforces valid name+size combinations.
     */
    icon?: IconIdentifier
    /**
     * @deprecated Use `icon` prop instead (e.g., icon="search-sm").
     * Icon name in PascalCase (e.g. ArrowDown, Warning) or camelCase (e.g. arrowDown, warning).
     */
    name?: AnyIconName
    /**
     * @deprecated Use `icon` prop instead (e.g., icon="search-sm").
     * Icon size - used to set width and height on an `svg` element.
     */
    size?: IconSize
  }>(),
  {
    icon: undefined,
    name: undefined,
    size: 'md'
  }
)

const iconComponent = computed(() => {
  let size: IconSize
  let name: string

  if (props.icon) {
    const lastDash = props.icon.lastIndexOf('-')
    size = props.icon.slice(lastDash + 1) as IconSize
    name = props.icon
      .slice(0, lastDash)
      .split('-')
      .map(s => s.charAt(0).toUpperCase() + s.slice(1))
      .join('')
  } else if (props.name) {
    size = props.size
    name = props.name.charAt(0).toUpperCase() + props.name.slice(1)
    const kebabName = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
    console.warn(
      `The "name" and "size" props are deprecated and will be removed in the next major version.
      Use the "icon" prop instead: <a-icon icon="${kebabName}-${size}" />`
    )
  } else {
    console.error('a-icon: either "icon" or "name" prop is required')
    return null
  }

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

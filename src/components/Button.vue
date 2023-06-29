<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import ASpinner from './Spinner.vue'
import AIcon from './Icon.vue'

type ButtonVariant = 'primary' | 'subtle' | 'standard'

type ButtonSize = 'md' | 'lg' | 'auto'

export default defineComponent({
  name: 'AButton',
  components: { ASpinner, AIcon },
  props: {
    /**
     * plain-text button label
     *
     * use this prop to provide an accessible name for icon buttons
     * or other buttons with complex markup or without a proper text label
     */
    label: {
      type: String,
      default: ''
    },
    /**
     * visual presentation variant
     *
     * `primary`, `subtle`, or `standard` (default)
     */
    variant: {
      type: String as PropType<ButtonVariant>,
      default: 'standard'
    },
    /**
     * button size
     *
     * `lg`, `md` (default), or `auto`
     */
    size: {
      type: String as PropType<ButtonSize>,
      default: 'md'
    },
    /**
     * recommended usage: icon name as a String
     * the icon size will be inferred from the button size prop
     */
    icon: {
      type: String,
      default: ''
    },
    /**
     * whether the button is in a loading state
     *
     * automatically disables the button
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * whether the button is disabled
     *
     * __important__: remove the 'href' attribute when disabling a link
     * because `a` elements don't have a disabled state.
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * whether the button is in a [pressed](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-pressed) state,
     * e.g. a menu button while the menu is open.
     *
     * Default value is `undefined`, applicable in most cases, i.e. for regular (non-toggle) buttons.
     */
    pressed: {
      type: Boolean,
      default: undefined
    }
  },
  setup(props, { attrs, slots }) {
    const tagName = computed(() => {
      return attrs.href ? 'a' : 'button'
    })
    const isDisabled = computed(() => {
      return tagName.value === 'button' && (props.disabled || props.loading)
    })

    const iconName = computed(() => (props.icon.length ? props.icon : undefined))

    const iconSize = computed(() => {
      if (props.size !== 'auto') {
        return props.size
      }
      return undefined
    })

    const ariaLabel = computed(() => {
      if (props.label && !!(slots.default || props.icon)) {
        return props.label
      }
      return undefined
    })

    return {
      tagName,
      isDisabled,
      iconName,
      iconSize,
      ariaLabel
    }
  }
})
</script>
<template>
  <component
    :is="tagName"
    class="box-border shrink-0 cursor-pointer items-center justify-center rounded transition duration-200 ease-in-out body-sm-500 focus-visible:focus-shadow disabled:cursor-not-allowed disabled:opacity-40"
    :class="{
      flex: tagName === 'button',
      'inline-flex': tagName === 'a',
      'h-10 min-w-10 px-4': size === 'lg' && !icon,
      'h-8 min-w-8 px-3': size === 'md' && !icon,
      'text-white': variant === 'primary',
      'bg-darkblue': variant === 'primary' && pressed,
      'bg-mediumblue': variant === 'primary' && !pressed,
      'bg-zurich text-mediumblue': variant !== 'primary' && pressed,
      'text-inherit bg-transparent': variant === 'subtle' && !pressed,
      'bg-athens text-navy': variant === 'standard' && !pressed,
      'hover:bg-blueribbon active:bg-darkblue': variant === 'primary' && !isDisabled,
      'hover:bg-gray hover:text-navy active:bg-zurich active:text-mediumblue':
        variant !== 'primary' && !isDisabled
    }"
    :disabled="isDisabled"
    :aria-label="ariaLabel"
    :aria-pressed="pressed">
    <div class="relative flex grow items-center justify-center">
      <a-spinner v-if="loading" :class="icon ? 'absolute' : 'mr-1'" size="sm" />
      <div
        :class="{ invisible: !!(loading && icon) }"
        class="flex grow items-center justify-center">
        <!--
        @slot __Note__: Slot content takes precedence over the label prop.
        Default value: 
        
        the value of label prop or an icon
      -->
        <slot>
          <template v-if="!!(iconName && iconSize)">
            <a-icon :name="iconName" :size="iconSize"></a-icon>
          </template>
          <template v-else>{{ label }}</template>
        </slot>
      </div>
    </div>
  </component>
</template>

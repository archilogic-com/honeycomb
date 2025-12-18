<script lang="ts">
import { defineComponent, PropType } from 'vue'

export type LinkVariant = 'primary' | 'standard'

export type LinkSize = 'sm' | 'md'

export default defineComponent({
  name: 'ALink',

  props: {
    /**
     * plain-text link content
     *
     * for markup use the default slot instead
     */
    content: {
      type: String,
      default: ''
    },
    /**
     * visual presentation variant
     *
     * `primary` or `standard` (default)
     */
    variant: {
      type: String as PropType<LinkVariant>,
      default: 'standard'
    },
    /**
     * link size
     *
     * `sm` (default) or `md`
     */
    size: {
      type: String as PropType<LinkSize>,
      default: 'sm'
    }
  },
  computed: {
    linkClasses() {
      const linkClasses = ['active:text-mediumblue active:decoration-zurich']

      if (this.size === 'sm') {
        linkClasses.push('body-sm')
      } else {
        linkClasses.push('body-md')
      }

      if (this.variant === 'standard') {
        linkClasses.push('text-navy hover:text-newyork decoration-warsaw hover:decoration-stone')
      } else {
        linkClasses.push(
          'text-mediumblue hover:text-darkblue decoration-mediumblue hover:decoration-darkblue'
        )
      }
      return linkClasses.join(' ')
    },
    tagName() {
      return this.$attrs.href ? 'a' : 'button'
    }
  }
})
</script>
<template>
  <component
    :is="tagName"
    class="relative inline-block cursor-pointer underline transition duration-200 ease-in-out after:absolute after:-inset-1 after:inline-block after:rounded after:transition after:duration-200 after:ease-in-out focus-visible:outline-none focus-visible:after:focus-shadow"
    :class="linkClasses">
    <!--
      @slot __Note__: Slot content takes precedence over the content prop.
      Default value: 
      
      the value of content prop    
		-->
    <slot>{{ content }}</slot>
  </component>
</template>

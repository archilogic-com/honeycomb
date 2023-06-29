<template>
  <header
    class="sticky top-0 box-content flex h-10 w-full items-center border-b border-gray bg-white py-2">
    <!--
      @slot Use the slot to add children to the header, e.g. logo, heading, search bar, filters, pagination, etc.
      The slot is empty by default.
		-->
    <slot />
  </header>
</template>

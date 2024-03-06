<template>
  <div class="flex size-full flex-col">
    <slot class="flex-1" name="header" />
    <div class="h-max w-full flex-1 bg-gray-50">
      <div class="mx-auto size-full max-w-screen-xl p-5">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

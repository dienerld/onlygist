<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'
import { EBody, EContainer, EHead, EHeading, EHtml, ETailwind, EText } from 'vue-email'

const props = withDefaults(defineProps<{
  name: string
}>(), {
  name: 'Dev',
})
</script>

<template>
  <ETailwind>
    <EHtml>
      <EHead>
        <EBody class="bg-white my-auto mx-auto font-sans">
          <EContainer class="border border-solid border-gray-300 p-[20px] md:p-7 rounded mx-auto my-[40px] max-w-[475px]">
            <EHeading class="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Compra aprovada!
            </EHeading>

            <EText class="text-black text-[14px] leading-[24px]">
              Olá {{ props.name }}, parabéns pela compra de seu Gist!.
            </EText>
          </EContainer>
        </EBody>
      </EHead>
    </EHtml>
  </ETailwind>
</template>

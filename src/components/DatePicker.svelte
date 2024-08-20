<script>
  import { onMount } from 'svelte'
  import DatePickerInner from './DatePickerInner.svelte'
  import { setLoadingCursor } from './lib/context'

  let ready = false

  onMount(async () => {
    await setLoadingCursor()
    ready = true
  })
</script>

{#if ready}
  {#if $$slots.default}
    <DatePickerInner {...$$props} on:*>
      <slot />
    </DatePickerInner>
  {:else}
    <DatePickerInner {...$$props} on:* />
  {/if}
{/if}

<script>
  import { createEventDispatcher, onMount } from 'svelte'
  import DatePickerInner from './DatePickerInner.svelte'
  import { setLoadingCursor } from './lib/context'

  let ready = false

  onMount(async () => {
    await setLoadingCursor()
    ready = true
  })

  /**
   * ! WARNING
   *
   * The only events forwarded here are the ones we are currently using in
   * Real Rev...
   *
   * Forwarding both Date and Date Range events bricked our build.
  */
  const dispatch = createEventDispatcher()
  function forwardEvent (event) {
    console.log('Forwarding event:', event.type)
    dispatch(event.type, event.detail)
  }
</script>

{#if ready}
  {#if $$slots.default}
    <DatePickerInner {...$$restProps}
      on:range-selected={forwardEvent}
      on:open={forwardEvent}
      on:close={forwardEvent}
      on:updateStart={forwardEvent}
      on:updateEnd={forwardEvent}
    >
      <slot />
    </DatePickerInner>
  {:else}
    <DatePickerInner {...$$restProps}
      on:range-selected={forwardEvent}
      on:open={forwardEvent}
      on:close={forwardEvent}
      on:updateStart={forwardEvent}
      on:updateEnd={forwardEvent}
    />
  {/if}
{/if}

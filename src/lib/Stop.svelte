<script>
        import { hasStarted } from './stores';
        import { createEventDispatcher } from 'svelte';
        import { Button } from 'carbon-components-svelte';

        const dispatch = createEventDispatcher();

        function terminate(){
            let now = new Date()
            hasStarted.update((n)=> n = false)
            dispatch('stopped',{
            now: now
        })
        }

</script>

<Button kind="secondary" on:click={terminate}>Stop Fast</Button>
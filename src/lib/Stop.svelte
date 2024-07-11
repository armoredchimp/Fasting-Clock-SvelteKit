<script>
        import { hasStarted } from './stores';
        import { createEventDispatcher } from 'svelte';

        const dispatch = createEventDispatcher();

        function terminate(){
            let now = new Date()
            hasStarted.update((n)=> n = false)
            dispatch('stopped',{
            now: now
        })
        }

</script>

<button on:click={terminate} style="width: 25rem; height: 4rem; font-size: 2rem; margin-top: 5rem; margin-left: 4rem;">
Stop Fast
</button>
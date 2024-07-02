<script>
    
    import { hours, startDate, futureDate, hasStarted } from './stores'
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    
    let end = new Date()



    function begin(){
        
        let now = new Date()
        end = new Date(now.getTime() + $hours * 60 * 60 * 1000)
        startDate.update((n)=> n = now) 
        futureDate.update((n)=> n = end)
        console.log(end)
        hasStarted.update((n)=>n = true)
        dispatch('started',{
            now: now
        })
    }

</script>

<style>
        @font-face {
        font-family: 'Plus Jakarta Sans Variable';
        font-style: normal;
        font-display: swap;
        font-weight: 200 800;
        src: url(https://cdn.jsdelivr.net/fontsource/fonts/plus-jakarta-sans:vf@latest/latin-wght-normal.woff2) format('woff2-variations');
        unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
}

    button {
        font-family: 'Plus Jakarta Sans Variable';
    }

</style>


<button on:click={begin} style="width: 20rem; height: 5rem;"

>Begin Fast


</button>
<script>
    
    import { hours, currPerc, futureDate } from "./stores";

    let length = $hours;
    

    function displayPerc(){
        currPerc.update((n)=> length * 4.2)       
    }

    function hoursChange(){
        hours.update((n)=> n = length)
    }

    function futureUpdate(){
        let now = new Date()
        let end = new Date(now.getTime() + $hours * 60 * 60 * 1000)
        futureDate.update((n)=> n = end)
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

input {
    font-family: 'Plus Jakarta Sans Variable';
}

</style>




<h3  style:margin-bottom="2rem">Fasting Length</h3>
<label>
    <!-- <input type="number" bind:value={length} on:input={displayPerc} on:input={hoursChange} on:input={futureUpdate} min="1" max="24" /> -->
    <input type="range" bind:value={length} on:input={displayPerc} on:input={hoursChange} on:input={futureUpdate} min="1" max="24" />
</label>
{#if length === 24}
<p>The fast will be for {$hours} hours!</p>
{:else if length === 1}
<p>The fast will be for {$hours} hour.</p>
{:else}
<p>The fast will be for {$hours} hours.</p>
{/if}
<script>
    import { hours, currPerc, totalTime, succeeded, startDate, futureDate, hasStarted, remHours, remMins, remSeconds } from '$lib/stores'; 

</script>

<!-- <Clock />
<h2>Hello</h2> -->
<style>
    .stats-box{
        display: grid;
        margin-top: 5rem;
        height: 10rem;
        margin-left: 3rem;
        grid-gap: 3rem;
               
    }
    h3 {
        letter-spacing: 0.15rem;
        font-size: 1.2rem;
    }
</style>


<div class="stats-box" >
    {#if !$succeeded}
    <h3>There is currently {$remHours} {$remHours === 1 ? 'hour' : 'hours'} and {$remMins % 60} {$remMins === 1 ? 'minute' : 'minutes'} left for the fast.</h3>
    <h3>The fast will end at {$futureDate.toLocaleString()}.</h3>
    <h3>{$remSeconds} {$remSeconds === 1 ? 'second' : 'seconds'} remain</h3>
    {:else}
    <h3>The fast was completed at {$futureDate.toLocaleString()}, good job!</h3>
    <h3>The fast is currently at {$totalTime}</h3>
    {/if}
</div>
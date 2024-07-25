<script>
    import { hours, currPerc, totalTime, succeeded, startDate, futureDate, hasStarted, remHours, remMins, remSeconds } from '$lib/stores';
    
    function formatTime(milliseconds) {
        let hours = Math.floor(milliseconds / (1000 * 60 * 60));
        let minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
    }

    $: expectedDuration = $hours * 60 * 60 * 1000;
    $: actualDuration = $hasStarted ? $totalTime : ($futureDate - $startDate);
    $: exceededTime = Math.max(0, actualDuration - expectedDuration);
</script>

<style>
    .stats-box {
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

<div class="stats-box">
    {#if $hasStarted && !$succeeded}
        <h3>There is currently {$remHours} {$remHours === 1 ? 'hour' : 'hours'} and {$remMins % 60} {$remMins === 1 ? 'minute' : 'minutes'} left for the fast.</h3>
        <h3>The fast will end at {$futureDate.toLocaleString()}.</h3>
        <h3>{$remSeconds} {$remSeconds === 1 ? 'second' : 'seconds'} remain</h3>
        <h3>Expected duration: {formatTime(expectedDuration)}</h3>
        <h3>Current duration: {formatTime(actualDuration)}</h3>
    {:else if $succeeded}
        <h3>The {$hours}h fast was completed at {$futureDate.toLocaleString()}, good job!</h3>
        <h3>Expected duration: {formatTime(expectedDuration)}</h3>
        <h3>Actual duration: {formatTime(actualDuration)}</h3>
        {#if exceededTime > 0}
            <h3>Exceeded by: {formatTime(exceededTime)}</h3>
        {/if}
    {/if}
</div>
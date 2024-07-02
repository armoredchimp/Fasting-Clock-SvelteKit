<script>
    import { onMount } from "svelte";
    
    let date = new Date();

    const formatter = new Intl.DateTimeFormat(
        'en',
        {
            hour12: true,
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit'
        }
    )

    // $: hour = date.getHours();
    // $: min = date.getMinutes();
    // $: sec = date.getSeconds();

    // let amPM = 'AM';

    // $: mainHour = (hour >= 12) ? hour - 12 : hour

    onMount( ()=>{
        const interval = setInterval(()=>{
            date = new Date();
            // amPM = (hour >= 12) ? "PM" : "AM";
        }, 1000);
    });

</script>

<style>
    /* h1 {
        color: rgb(255, 251, 0);
    } */
</style>

<h3>Current Time:</h3>
<h1>{formatter.format(date)}</h1>
<!-- <h1>{(mainHour === 0 ? 12 : mainHour) < 10 ? '\u00A0\u00A0' + (mainHour === 0 ? 12 : mainHour) : (mainHour === 0 ? 12 : mainHour)} : {min < 10 ? '0' + min : min} : {sec < 10 ? '0' + sec : sec} {amPM}</h1> -->
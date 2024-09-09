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



    onMount( ()=>{
        const interval = setInterval(()=>{
            date = new Date();
            // amPM = (hour >= 12) ? "PM" : "AM";
        }, 1000);
    });

</script>

<style>
    h2 {
        min-width: 10rem;
    }
</style>

<h3>Current Time:</h3>
<h2>{formatter.format(date)}&nbsp;&nbsp;</h2>
<!-- <h1>{(mainHour === 0 ? 12 : mainHour) < 10 ? '\u00A0\u00A0' + (mainHour === 0 ? 12 : mainHour) : (mainHour === 0 ? 12 : mainHour)} : {min < 10 ? '0' + min : min} : {sec < 10 ? '0' + sec : sec} {amPM}</h1> -->
<script>
    // import { onMount } from "svelte";
    import { futureDisplay } from "./stores";

    // let date = new Date();
    // $: hour = date.getHours();
    // $: min = date.getMinutes();
    // $: sec = date.getSeconds();

    // let amPM = 'AM';
    // let amPM2 = amPM;

    const formatter = new Intl.DateTimeFormat(
        'en',
        {
            hour12: true,
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit'
        }
    )

    // onMount( ()=>{
    //     const interval = setInterval(()=>{
    //         date = new Date();
    //         let curr = (lengthVal + (hour - 12))
    //         amPM = (hour >= 12) ? "PM" : "AM"; 
    //         let ampPMreverse = "AM"
    //         ampPMreverse = (amPM === "AM") ? "PM" : "AM"
    //         amPM2 =((curr / 12) >= 1 && (curr / 12) < 2) ? ampPMreverse : amPM   
    //     }, 1000);
    // });
    
    // onMount( ()=>{
    //     const interval = setInterval(()=>{
    //        let now = new Date();

    //     }, 1000);
    // });

    
    // $: currHour = ($hours + (hour -12)) % 12


   
</script>

<style>

.label {
    transform: translateY(-1rem);
    transform: translateX(3rem);
}    

.main-clock {
    transform: translateX(-3rem);
    font-size: 4rem;
}    
    
</style>


<h4 class="label">Ending Time:</h4>
<h1 class="main-clock">{formatter.format($futureDisplay)}</h1>
<!-- <h1>{(currHour === 0 ? 12 : currHour) < 10 ? '\u00A0\u00A0' + (currHour === 0 ? 12 : currHour) : (currHour === 0 ? 12 : currHour)} : {min < 10 ? '0' + min : min} : {sec < 10 ? '0' + sec : sec} {amPM2}</h1> -->

<script>
    
    
    import { totalDuration, futureDate, currPerc, hasStarted, remSeconds, succeeded } from './stores';
    import Clock from './Clock.svelte';
    import TargetClock from './TargetClock.svelte';
	import { afterUpdate } from 'svelte';
	

    
    let remainingTime = 0;
    // let end = new Date()

  

   

   


    function calcRemPerc(){
        if($hasStarted === true){
        let currentTime = new Date();
        // futureDate.update((n)=>end = n);
        remainingTime = $futureDate.getTime() - currentTime.getTime()
        if(remainingTime > 0){
        currPerc.update((n)=>n = (remainingTime / $totalDuration) * 100)
    }
}   
}

    

    afterUpdate(()=>{
        if($hasStarted === true){
        setInterval(()=>{
            calcRemPerc()
        }, 1000);
        }
    }
    )
</script>

<style>
   .circle {
    position: relative;
    top: 0;
    height: 40rem;
    width: 40rem;
    border-radius: 50%;
    overflow: hidden;
    background-color: darkcyan;
   }

   .overlay {
    position: absolute;
    bottom: 0.01px;
    height: 50%;
    width: 100%;
    background-color: purple;
   }

   .clock {
    position: absolute;
    top: 4rem;
    left: 7.5rem;
    z-index: 0;

}
   .target-clock {
    position: absolute;
    top: 16.5rem;
    left: 12.5rem;
    z-index: 1;
   }

   .perc {
    position: absolute;
    top: 18.5rem;
    left: 13rem;
    z-index: 1;
   }
 
   h1 {
    font-size: 4rem;
    font-weight: bold;
   }
</style>

<div class="circle">
    <div class="overlay" style="height: {$currPerc}%; transition: 0.1s ease-in"></div>
    {#if $hasStarted === false && $succeeded === false}
   
    <div class="target-clock" >
        <TargetClock />
    </div>
    {:else if $remSeconds > 0}
    <div class="perc">
        <h1>{$currPerc.toFixed(2)} %</h1>
    </div>
    {:else}
    <div class="perc">
        <h1>{$currPerc.toFixed(2)} %</h1>
    </div>
    {/if}

</div>
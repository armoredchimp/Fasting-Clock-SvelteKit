<script>
    import axios from "axios";
    import { afterUpdate, onMount } from "svelte";
    import { Loading } from "carbon-components-svelte";
    import Circle from "$lib/Circle.svelte";
    import Card from "$lib/Card.svelte";
    import Clock from "$lib/Clock.svelte";
    import LengthInput from "$lib/LengthInput.svelte";
    import Start from "$lib/Start.svelte";
    import Stop from "$lib/Stop.svelte";
    import Stats from "$lib/Stats.svelte";
    import Login from "$lib/Login.svelte";
    import { loading, hours, currPerc, succeeded, exceeded, startDate, futureDate, hasStarted,  remHours, remMins, remSeconds, currPage, totalTime } from '$lib/stores';
    // import { aws_stages } from "../aws/stages";
    import { user, registrationStatus } from "$lib/auth/userStore";
	import Logout from "$lib/Logout.svelte";
    


   
    
    
   onMount(()=>{
    currPage.set('/')
   }) 
  
    
    
  

    

   

    function handleStart(){
        console.log('start received') 
        $succeeded = false;
        $currPerc = 100;
        
        putFast()
        calcRemTime()
    }

   export function handleStop(){
        console.log('stop received')
        $hasStarted = false;
        putFast()
        $succeeded = false;
        $currPerc = 50;
        $hours = 12;
        $loading = true;
        setTimeout(()=>{
            $loading = false;
            window.location.reload();
        }, 1300)
    }
  
    function calcRemTime(){
        if( $hasStarted === true && !$succeeded){
            if($remSeconds <= 0){
                success()
            }
    }
}


    function success(){
        console.log('success')
        if($currPerc <= 0){
            $exceeded = true
        }
        $succeeded = true;
        putFast()
    }

    afterUpdate(()=>{
        if($hasStarted === true){
        setInterval(()=>{
            if (!$succeeded){

                calcRemTime()
            }
        }, 1000);
        }
    }
    )

    async function putFast(){
        let data = {
            "pathParameters": {
                "UserID": $user?.username,
                "StartDate": $startDate.getTime(),
                "EndDate": $futureDate.getTime(),
                "InProgress": $hasStarted,
                "PercentRemaining": $currPerc,
                "ExpectedDuration": $hours,
                "ActualDuration": $totalTime,
                "Succeeded": $succeeded
            }
        }
        // let url = aws_stages.API_PUT_URL
        let url = import.meta.env.VITE_API_PUT_URL
        console.log(data)
        axios.put(url, data)
        .then(response =>{
            console.log(response.data)
        })
        .catch(error=> {
            console.error(`Error: ${error}`)
        });
    }


</script>

<style>
    @font-face {
        font-family: 'Plus Jakarta Sans Variable';
        font-style: normal;
        font-display: swap;
        /* color: #4777ad4b; */
        font-weight: 200 800;
        src: url(https://cdn.jsdelivr.net/fontsource/fonts/plus-jakarta-sans:vf@latest/latin-wght-normal.woff2) format('woff2-variations');
        unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
}


h1, h2, p {
    font-family: 'Plus Jakarta Sans Variable';
}

    .top-container {
        display: flex;
        justify-content: space-between;
        /* background-color: #4777ad4b; */
        padding: 0.5rem;
        border-radius: 0.3rem;
        height: 10rem;
        margin-bottom: 3rem;
    }

    /* .auth-section {
        width: 12rem;
        transform: translate(-1rem, -1rem);
    } */

    .title-container {
        /* position: relative; */
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title {
        font-size: 3.5rem;
        text-overflow: ellipsis;  
        white-space: no-wrap;
        margin-top: 5rem;
        font-weight: 500;
        letter-spacing: 0.4rem;
        /* position: absolute; */
        transform: translateX(3.5rem);

    }

    .circle-stats {
        /* margin: "0 auto";  */
        max-width: "40rem";  
        /* position: "relative";  */
        font-family: 'Plus Jakarta Sans Variable';
        display: flex;
        justify-content: space-evenly;
        transform: translateY(3rem);
    }

    .clock {
        margin-bottom: 7rem;
        /* margin-bottom: 2rem */
    }

    /* .length-input {
        margin-bottom: 2rem;
    } */

    .info-section {
        margin-top: 6rem;
        margin-bottom: 2rem;
        background-color: var(--modal-color);
        /* padding-left:7rem;
        padding-top:7rem; */
        height: 34rem;
        min-width: 21rem;
        padding: 4rem;
        border-radius: 1rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .circle-cont {
        transform: translateY(-6rem);
    }

    .start {
        margin-top: 5rem;
    }

    .stop {
        margin-top: 15rem;
        transform: translateX(3rem);
    }
    .stats-box {
        margin-top: 5rem;
    }
    .gottaLogin {
        transform: translateY(5rem);
    }
</style>
{#if !$loading}
<div class="top-container" >
    
    <div class="title-container">
        <!-- <h1 class="title">Fasting Clock</h1> -->
    </div>
    <div style="width: 10rem">
        <!-- <h4>{$hasStarted}</h4>
        <h4>{$succeeded}</h4>
        <h4>{$futureDate}</h4>
        <h4>{$startDate}</h4>
        <h4>{$currPerc.toFixed(2)}</h4>
        <h4>{$remSeconds}</h4> -->
    </div>
</div>

<div class="circle-stats">
    <div></div>
    <div style:margin-left="1rem">
        {#if $hasStarted === false && $succeeded === false}    
    
    
        <div class="info-section" >
            <div class="clock"><Clock /></div>
            <div class="length-input"><LengthInput/></div>
        {#if $user !== null}    
            <div class="start"><Start on:started={handleStart}/></div>
        {:else}
            <div class="gottaLogin"><p>Log in to begin a fast!</p></div>    
        {/if}    
        </div>
        {:else}
        <div style:min-width="1rem"></div>
        <div class="stats-box" >
           
            <Stats/>
    
           <div class="stop"><Stop on:stopped={handleStop} /></div> 
        </div>
        {/if}
    </div>

    <div style:min-width="5rem"></div>
    <div class="circle-cont"><Circle /></div>
    
    <div>
    </div>
</div>
{:else}
<Loading />
{/if}

    <!-- <div  >
        {#if $user !== null && $hasStarted === true}
        <Stop on:stopped={handleStop}/>
       
        
        {:else if $user !== null && $hasStarted === false}
        <Start on:started={handleStart}/>
        <div style:width="22rem">
            <Login />
        </div>
        
        {/if}   
        </div>
         -->
    
   
  
<!-- <div>        
    {#if $succeeded === true}
    <div style:margin-top="5rem" style:margin-left="3rem">
        <p>The fast has been completed, good job!</p>
        <p>The fast started at {$startDate.toLocaleString()} and took {$hours} hours.</p>
    </div>    
    {/if}

</div> -->

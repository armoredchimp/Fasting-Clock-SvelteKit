<script>
    import axios from "axios";
    import { onMount, afterUpdate } from "svelte";
    import Circle from "$lib/Circle.svelte";
    import LengthInput from "$lib/LengthInput.svelte";
    import Start from "$lib/Start.svelte";
    import Stop from "$lib/Stop.svelte";
    import Login from "$lib/Login.svelte";
    import Register from "$lib/Register.svelte";
    import { hours, currPerc, succeeded, startDate, futureDate, hasStarted, fastID, remHours, remMins, remSeconds } from '$lib/stores';
    import { aws_stages } from "../aws/stages";
    import { user, registrationStatus } from "$lib/auth/userStore";
	import Logout from "$lib/Logout.svelte";
    

    let startedApp = false;
    let hoursApp = 0;
    let start = new Date();
    let ending = new Date();
    
    
  
    
    
    hours.subscribe((n)=> hoursApp = n)
    hasStarted.subscribe((n)=> startedApp = n)

    let startDisplay = ''
    let endingDisplay = ''

    onMount(()=>{
        if($fastID === 0){
            $fastID = randomNumber()
        }
        console.log($fastID)
    })
       

    function randomNumber(){
        return Math.floor(Math.random() * (1000000 -10000) + 10000)
    }

    function handleStart(){
        console.log('start received')
        startDate.update((n)=> start = n)
        futureDate.update((n)=> ending = n)
        startDisplay = start.toLocaleString()
        endingDisplay = ending.toLocaleString()
        $currPerc = 100;
        
        // putFast()
        calcRemTime()
    }

    function handleStop(){
        console.log('stop received')
        $currPerc = 50;
    }
  
    function calcRemTime(){
        if( startedApp === true){
            if($remSeconds <= 0){
                success()
            }
    }
}

    function success(){
        console.log('success')
        startedApp = false;
        $hasStarted = false;
        $currPerc = 0;
        $succeeded = true;
        putFast()
    }

    afterUpdate(()=>{
        if($hasStarted === true){
        setInterval(()=>{
            calcRemTime()
        }, 1000);
        }
    }
    )

    async function putFast(){
        let data = {
            "pathParameters": {
                "FastID": $fastID,
                "UserID": $user?.username,
                "StartDate": start.getTime(),
                "EndDate": ending.getTime(),
                "InProgress": true,
                "PercentCompleted": $succeeded ? 100 : 0,
                "TotalDuration": hoursApp 
            }
        }
        let url = aws_stages.API_PUT_URL
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

    .auth-section {
        width: 10rem;
    }

    .title-container {
        /* position: relative; */
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title {
        font-size: 2.4rem;
        text-overflow: ellipsis;  
        white-space: no-wrap;
        /* position: absolute; */
        transform: translateX(-5.5rem);

    }
</style>
<div class="top-container" >
    <div class="auth-section">
    {#if $user !== null}
    <h2>Logged in as {$user.username}</h2>
    <Logout /> 
    {:else}
    <Register />       
    {/if}
    </div>
    <div class="title-container">
        <h1 class="title">Fasting Clock</h1>
    </div>
    <div style="width: 10rem"></div>
</div>

<div style:margin="0 auto" style:max-width="40rem" style:position="relative" style:font-family='Plus Jakarta Sans Variable'>
    <Circle 
    
        
    />
    {#if startedApp === false && $succeeded === false}    
    <div style:position="absolute" style:right="-15rem" style:top="18rem" >
        {#if $user !== null}
        <Start on:started={handleStart}/>
        {:else}
        <h1 style:margin-bottom="3rem">Log in to begin a fast</h1> 
        <Login />
        {/if}   
        </div>
    <div style:margin-top="5rem" style:margin-left="4rem">
        <LengthInput/>
    </div>
    {:else if $succeeded === false}
    <div style:margin-top="5rem" style:margin-left="3rem">
        <p>There is currently {$remHours} {$remHours === 1 ? 'hour' : 'hours'} and {$remMins % 60} {$remMins === 1 ? 'minute' : 'minutes'} left for the fast.</p>
        <p>The fast will end at {endingDisplay}.</p>
    </div>
        <Stop on:stopped={handleStop}/>
    {:else if $succeeded === true}
    <div style:margin-top="5rem" style:margin-left="3rem">
        <p>The fast has been completed, good job!</p>
        <p>The fast started at {startDisplay} and took {$hours} hours.</p>
    </div>    
    {/if}

</div>

<script lang="ts">
import { Amplify } from 'aws-amplify';
import amplifyConfig from '$lib/amplifyConfig';
import { getCurrentUser, fetchAuthSession} from 'aws-amplify/auth';
import { onMount } from 'svelte';
import { userStore, user } from '$lib/auth/userStore';
import { hours, currPerc, startDate, futureDate, hasStarted, succeeded } from '$lib/stores';
import axios from 'axios';
import { aws_stages } from '../aws/stages';
import { Tabs, Tab, TabContent } from "carbon-components-svelte";
Amplify.configure(amplifyConfig);



onMount(async () =>{
    await checkAuth()
})

async function checkAuth(){
    try {
        const {tokens} = await fetchAuthSession();
        if(tokens){
            const currentUser = await getCurrentUser();
            userStore.setUser(currentUser)
            await checkActiveFast(currentUser.username)
        }else {
            userStore.reset()
        }
    } catch (err){
        console.error('Not authenticated', err)
        userStore.reset()
    }
}

async function checkActiveFast(username: string){
    try {
        const url = aws_stages.API_GET_URL.replace("{username}", username)
        const response = await axios.get(url)
        const activeFast = response.data

        if (activeFast){
            console.log("Active fast data: ", activeFast);
            hours.set(Number(activeFast.TotalDuration));
            currPerc.set(Number(activeFast.PercentRemaining));
            startDate.set(new Date(Number(activeFast.StartDate)));
            futureDate.set(new Date(Number(activeFast.EndDate)));
            hasStarted.set(true);
            succeeded.set(false);

            console.log("Stores after setting:", {
                hours: $hours,
                currPerc: $currPerc,
                startDate: $startDate,
                futureDate: $futureDate,
                hasStarted: $hasStarted,
                succeeded: $succeeded
            })
        }else {
            hasStarted.set(false)
            succeeded.set(false)
        }
        
    }catch(err){
        console.error(err)
    }
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

h1, h2, h3, h4, p {
    font-family: 'Plus Jakarta Sans Variable';
}

    .top-bar {
        margin-top: 2rem;
        margin-bottom: 3rem;
        display: flex;
        justify-content: space-around;
    }

    h4 {
        font-size: 0.9rem;
    }
   
</style>

<!-- <div class="top-bar">
<Tabs>
    <Tab label="Clock" />
    <Tab label="Calendar" />
    <Tab label="Analytics" />
    {#if $user !== null}
    <Tab label = {$user.username}/>
    {:else}
    <Tab label = "Register"/>
    {/if}
      
    <svelte:fragment slot="content">
        <TabContent>Clock</TabContent>
        <TabContent>Clock</TabContent>
        <TabContent>Clock</TabContent>
        {#if $user !== null}
        <TabContent>{$user.username}</TabContent>
        {/if}
    </svelte:fragment>    
</Tabs>
</div> -->

<div class="top-bar">
    <h4>Clock</h4>
    <h4>Calendar</h4>
    <h4>Analytics</h4>
    <h4>Theme</h4>
    <h4>About</h4>
    <h4>
        {#if $user !== null}
        {$user.username}
        {:else}
        Register
        {/if}
    </h4>
</div>

<slot />
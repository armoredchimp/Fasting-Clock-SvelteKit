<script lang="ts">
import { Amplify } from 'aws-amplify';
import amplifyConfig from '$lib/amplifyConfig';
import { getCurrentUser, fetchAuthSession} from 'aws-amplify/auth';
import { onMount } from 'svelte';
import { userStore } from '$lib/auth/userStore';
import { hours, currPerc, startDate, futureDate, hasStarted, succeeded } from '$lib/stores';
import axios from 'axios';
import { aws_stages } from '../aws/stages';

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

<slot />
<script lang="ts">
import { Amplify } from 'aws-amplify';
import amplifyConfig from '$lib/amplifyConfig';
import { getCurrentUser, fetchAuthSession} from 'aws-amplify/auth';
import { onMount } from 'svelte';
import { userStore } from '$lib/auth/userStore';

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
        }else {
            userStore.reset()
        }
    } catch (err){
        console.error('Not authenticated', err)
        userStore.reset()
    }
}



</script>

<slot />
<script>
import { Amplify } from 'aws-amplify';
import { writable } from 'svelte/store';
import amplifyConfig from '$lib/amplifyConfig';
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
	import { onMount } from 'svelte';
Amplify.configure(amplifyConfig);

export const user = writable();

onMount(async () =>{
    await checkAuth()
})

async function checkAuth(){
    try {
        const {tokens} = await fetchAuthSession();
        if(tokens){
            const currentUser = await getCurrentUser();
            user.set(currentUser)
        }
    } catch (err){
        console.error('Not authenticated', err)
    }
}

</script>
<script>
	import { signOut } from "aws-amplify/auth";
    import { userStore } from '$lib/auth/userStore';
    import { hasStarted, currPerc, hours } from './stores';

    async function logOut(){
        try {
            await signOut({ global: true })
            userStore.reset()
            $hasStarted = false;
            $currPerc = 50; 
            $hours = 12
        }catch(err) {
            console.error(err)
        }
    }


</script>

<style>
    button {
        background-color: #f44336; 
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s;
    }

    button:hover {
        background-color: #d32f2f; 
    }
</style>

<button type="button" on:click={logOut}>Logout</button>
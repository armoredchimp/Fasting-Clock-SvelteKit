<script>
	import { signOut } from "aws-amplify/auth";
    import { user } from '$lib/userStore';

    async function logOut(){
        try {
            await signOut({ global: true })
            user.set(null)

        }catch(err) {
            console.error(err)
        }
    }


</script>


<button type="button" on:click={logOut}>Logout</button>
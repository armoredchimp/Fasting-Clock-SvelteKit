<script>
    import axios from 'axios';
    // import { aws_stages } from '../aws/stages';
	import { signOut } from "aws-amplify/auth";
    import { user, userStore } from '$lib/auth/userStore';
    import { hours, currPerc, startDate, futureDate, hasStarted, totalTime, succeeded, theme } from '$lib/stores';


    async function logOut(){
        if($user !== null){
            try {
                if($hasStarted) {
                    await putFast()
                } 
                await signOut({ global: true })
                userStore.reset()
                $hasStarted = false;
                $currPerc = 50; 
                $hours = 12
                document.body.classList.remove('nature','ocean','warmth');
                $theme = 'default'
            }catch(err) {
                console.error(err)
            }

        }
    }

    async function putFast(){
        let data = {
            "pathParameters": {
                "UserID": $user?.username,
                "StartDate": $startDate.getTime(),
                "EndDate": $futureDate.getTime(),
                "InProgress": $hasStarted,
                "PercentCompleted": $currPerc,
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
    button {
        background: none;
        color: white;
        padding: 0;
        border: none;
        cursor: pointer;
        color: #e4dede;
        font: inherit;
        transition: color 0.3s ease;
    }

    button:hover {
        color: #c5c2c2;
    }
</style>

<button type="button" on:click={logOut}>Logout</button>
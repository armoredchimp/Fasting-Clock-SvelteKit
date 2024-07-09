<script>
    import axios from 'axios';
    import { aws_stages } from '../aws/stages';
	import { signOut } from "aws-amplify/auth";
    import { user, userStore } from '$lib/auth/userStore';
    import { hours, currPerc, startDate, futureDate, hasStarted } from '$lib/stores';

    async function logOut(){
        if($user !== null){
            try {
                await putFast()
                await signOut({ global: true })
                userStore.reset()
                $hasStarted = false;
                $currPerc = 50; 
                $hours = 12
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
                "InProgress": $hasStarted ? true : false,
                "PercentCompleted": $currPerc,
                "TotalDuration": $hours 
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
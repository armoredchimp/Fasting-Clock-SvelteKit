<script>
	import { currPage } from "$lib/stores";
	import { onMount } from "svelte";

    onMount(()=>{
        currPage.set('/user/profile')
    })
</script>

<style>
    .coming-soon {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        font-size: 2rem;
        text-align: center;
        font-weight: bold;
        color: #333;
    }

</style>

<h1 class="coming-soon">Profile page coming soon</h1>
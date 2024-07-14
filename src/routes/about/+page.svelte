<script>

	import { onMount } from "svelte";
    import { currPage } from "$lib/stores";

    onMount(()=>{
        currPage.set('/about')
    })



</script>


<h1>About</h1>
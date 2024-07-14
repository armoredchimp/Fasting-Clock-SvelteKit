<script>

	import { onMount } from "svelte";
    import { currPage } from "$lib/stores";

    onMount(()=>{
        currPage.set('/calendar')
    })



</script>

<h1>Calendar</h1>
<script>
	import { currPage } from "$lib/stores";
	import { onMount } from "svelte";

    onMount(()=>{
        currPage.set('/analytics')
    })
</script>
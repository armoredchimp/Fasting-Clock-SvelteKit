<script>
    import Record from "$lib/Record.svelte";
    import { onMount } from "svelte";
    import { currPage } from "$lib/stores";


    onMount(()=>{
        currPage.set('/history/record')
    })


</script>

<Record />
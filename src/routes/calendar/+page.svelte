<script>

	import { onMount } from "svelte";
    import { currPage } from "$lib/stores";
    import Calendar from "$lib/Calendar.svelte";

    onMount(()=>{
        currPage.set('/calendar')
    })



</script>



<Calendar />

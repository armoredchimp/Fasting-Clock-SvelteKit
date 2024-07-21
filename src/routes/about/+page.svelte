<script>

	import { onMount } from "svelte";
    import { currPage } from "$lib/stores";
    import Card from "$lib/Card.svelte";
    import { hasStarted } from "$lib/stores";
    import { awsCards, langCards } from "$lib/aboutData";

    onMount(()=>{
        currPage.set('/about')
    })



</script>

<style>
    .main-cont {
        display: flex;
        flex-direction: column;
        gap: 6rem;
    }

    .section-cont {
        margin-bottom: 5rem;
    }

    .primary {
        height: 30rem;
    }

    .card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
        gap: 3rem;
        padding: 2rem;
        justify-items: center;
        align-items: start;
    }

    .card-wrapper {
        display: grid;
    }
    h1 {
        text-align: center;
        margin-bottom: 2rem;
    }

    h2 {
        text-align: center;
        margin-bottom: 3rem
    }
</style>



<div class="main-cont">
    <div class="section-cont primary">
        
        <h2 style:margin-top="3rem">AWS Microservices</h2>
        <div class="card-grid">
        {#each awsCards as card (card.id)}
            <div class="card-wrapper">
            <Card title={card.title} svgPath={card.svgPath} desc={card.desc} />
            </div>    
            {/each}    
        </div>

    </div>

    <div class="section-cont secondary">
    <h2 style:margin-top="6rem">Languages and Frameworks</h2>

        <div class="card-grid">
        {#each langCards as card (card.id)}
            <div class="card-wrapper">
            <Card title={card.title} svgPath={card.svgPath} desc={card.desc} />
            </div>    
            {/each}    
        </div>
    </div>
</div>    
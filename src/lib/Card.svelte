<script>
    import { Accordion, AccordionItem } from "carbon-components-svelte";
    
    export let title;
    export let svgPath;
    export let desc;


</script>

<style>
    .card {
        background-color: var(--modal-color);
        border-radius: 0.8rem;
        padding: 2rem;
        text-align: center;
        transition: transform 0.3s ease-in-out;
        display: flex;
        width: 17rem;
        height: 100%;
        flex-direction: column;
        align-items: center;
    }

    .card:hover {
        transform: translateY(-0.5rem);
    }

    .icon-cont {
        width: 5rem;
        height: 7rem;
        margin-bottom: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .icon {
        max-width: 100%;
        max-height: 100%;
    }

    h3 {
        margin: 0;
        font-size: 1.2em;
    }

    p {
        font-size: 0.9em;
        margin-top: 1rem;
    }
</style>

<div class="card">
    <div class="icon-cont">
        <img src={svgPath} alt={title} class="icon" />
    </div>
    <Accordion>
        <AccordionItem title={title}>
            <p>{desc}</p>
        </AccordionItem>

    </Accordion>

</div>
<script>
    // @ts-nocheck
    import { afterUpdate, onMount } from "svelte";
    import { user } from "./auth/userStore";
    import { Loading } from "carbon-components-svelte";
    import { loading, fasts, dataFetched } from "./stores";
    import Calendar from '@event-calendar/core';
    import DayGrid from '@event-calendar/day-grid'
    import '@event-calendar/core/index.css';
    import './style/calendar.css'
    // import { aws_stages } from "../aws/stages";
    import axios from "axios";
   
    let ec;
    let plugins = [DayGrid];
    let options = {
        view: 'dayGridMonth',
        events: [],
        eventContent: renderEventContent,
        datesSet: handleDatesSet,
        height: 'auto',
    }
    
    let showDuration = true;
    
   
    onMount(async () => {
        if ($user?.username && !$dataFetched) {
            await fetchFasts();
        } else {
            updateCalendarEvents()
        }
    });
   
    $: if ($user !== null && !$dataFetched){
        fetchFasts()
    }


    async function fetchFasts() {
        if ($dataFetched || $fasts.length > 0){
            updateCalendarEvents()
        }

        try {
            $loading = true;
            const username = $user?.username
            console.log($user)
            console.log('Fetching fasts for username:', username);
            const url = import.meta.env.API_GET_ALL_URL.replace("{username}", username);
            // const url = aws_stages.API_GET_ALL_URL.replace("{username}", username);
            const response = await axios.get(url);
            $fasts = response.data;
            $dataFetched = true;
            console.log('Fetched fasts:', fasts);
            $loading = false;
            updateCalendarEvents();
        } catch (err) {
            console.error('Error fetching fasts: ', err)
            $loading = false;
        }
    }
   

    function millisToHours(millis) {
        return Math.round(millis / (60 * 60 * 1000) * 10) / 10; // Round to 1 decimal place
    }



    function updateCalendarEvents() {
        console.log('Updating calendar events. Fasts:', $fasts);
        const events = $fasts.map(fast => ({
            start: new Date(Number(fast.StartDate)),
            end: new Date(Number(fast.EndDate)),
            title: showDuration ? `${fast.ExpectedDuration}h` : ``,
            extendedProps: {
                expectedDuration: Number(fast.ExpectedDuration),
                actualDuration: Number(fast.ActualDuration),
                success: fast.Succeeded
            }
        }));
       
        if (ec) {
            ec.setOption('events', events);
        } else {
            options.events = events;
        }
    }

    function renderEventContent(info) {
        const expectedDuration = info.event.extendedProps.expectedDuration;
        const actualDuration = millisToHours(info.event.extendedProps.actualDuration);
        const success = info.event.extendedProps.success;
        const color = getColorForDuration(actualDuration);
        console.log(`Event: Expected ${expectedDuration}h, Actual ${actualDuration}h, Color: ${color}`);
        return {
            html: `<div class="fast-event" style="background-color: ${color}; color: white; padding: 1.2rem 5rem; font-weight: bold; font-size: 0.8em; white-space: nowrap;">
                     ${info.event.title} (${actualDuration}h) : ${success ? 'Succeeded' : 'Incomplete'}
                   </div>`
        };
    }

    function getColorForDuration(duration) {
        if (duration < 12) return 'var(--lighter-color)';
        if (duration < 24) return 'var(--secondary-color)';
        if (duration < 48) return 'var(--rare-color)';
        return '#DDA0DD';
    }

    function handleDatesSet(info) {
        console.log('Date range changed:', info.start, info.end);
    }
   
</script>



<style global>
      .calendar-cont {
        padding: 3rem;
        background-color: #f5f5f5;
        border-radius: 10px;
        height: 60rem;
    }


  </style>


{#if $user !== null}
    {#if $loading}
        <Loading />
    {:else}

    <div class="calendar-cont">
        <Calendar bind:this={ec} {plugins} {options} />
    </div>
    {/if}
{:else}
    <div>
        <h2>Log in to see the calendar</h2>
    </div>    
{/if}
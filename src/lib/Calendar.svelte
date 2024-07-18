<script>
    // @ts-nocheck
    import { afterUpdate, onMount } from "svelte";
    import { user } from "./auth/userStore";
    import { Loading } from "carbon-components-svelte";
    import { loading } from "./stores";
    import Calendar from '@event-calendar/core';
    import DayGrid from '@event-calendar/day-grid'
    import '@event-calendar/core/index.css';
    import './style/calendar.css'
    import { aws_stages } from "../aws/stages";
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
    let fasts = [];
    let showDuration = true;
   
    onMount(async () => {
        if ($user?.username) {
            await fetchFasts();
        }
    });
   
    $: if ($user !== null){
        fetchFasts()
    }


    async function fetchFasts() {
        try {
            $loading = true;
            const username = $user?.username
            console.log($user)
            console.log('Fetching fasts for username:', username);
            const url = aws_stages.API_GET_ALL_URL.replace("{username}", username);
            const response = await axios.get(url);
            fasts = response.data;
            console.log('Fetched fasts:', fasts);
            $loading = false;
            updateCalendarEvents();
        } catch (err) {
            console.error('Error fetching fasts: ', err)
            $loading = false;
        }
    }
   




    function updateCalendarEvents() {
        console.log('Updating calendar events. Fasts:', fasts);
        const events = fasts.map(fast => ({
            start: new Date(Number(fast.StartDate)),
            end: new Date(Number(fast.EndDate)),
            title: showDuration ? `${fast.TotalDuration}h` : (fast.Success ? 'Success' : 'Incomplete'),
            extendedProps: {
                duration: Number(fast.TotalDuration),
                success: fast.Success
            }
        }));
        
        if (ec) {
            ec.setOption('events', events);
        } else {
            options.events = events;
        }
    }

    function renderEventContent(info) {
        const duration = info.event.extendedProps.duration;
        const success = info.event.extendedProps.success;
        const color = getColorForDuration(duration);
        return {
            html: `<div class="fast-event" style="background-color: ${color}; color: white;  padding: 1.2rem 5rem; font-weight: bold; font-size: 0.8em; white-space: nowrap;">
                     ${info.event.title} 
                   </div>`
        };
    }

    function getColorForDuration(duration) {
        if (duration < 12) return '#87CEFA';
        if (duration < 24) return '#98FB98';
        if (duration < 48) return '#FFA07A';
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

{#if $loading}
    <Loading />
{:else}

<div class="calendar-cont">
    <Calendar bind:this={ec} {plugins} {options} />
</div>
{/if}

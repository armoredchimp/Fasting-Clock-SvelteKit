<script>
import { dataFetched, fasts, loading } from "./stores";
import { user } from "./auth/userStore";
import axios from "axios";
import { aws_stages } from "../aws/stages";
import { onMount } from "svelte";
import { Loading } from "carbon-components-svelte";

onMount(async () => {
        if ($user?.username && !$dataFetched) {
            await fetchFasts();
        }
    });
   
    $: if ($user !== null && !$dataFetched){
        fetchFasts()
    }

async function fetchFasts() {
        if ($dataFetched || $fasts.length > 0){
            return
        }

        try {
            $loading = true;
            const username = $user?.username
            console.log($user)
            console.log('Fetching fasts for username:', username);
            // @ts-ignore
            const url = aws_stages.API_GET_ALL_URL.replace("{username}", username);
            const response = await axios.get(url);
            $fasts = response.data;
            $dataFetched = true;
            console.log('Fetched fasts:', fasts);
            $loading = false;
            
        } catch (err) {
            console.error('Error fetching fasts: ', err)
            $loading = false;
        }
    }
   

function handleFastClick(fast){
    console.log('clicked!', fast)
}    

function calculateStopTime(fast) {
        const startTime = Number(fast.StartDate);
        const endTime = Number(fast.EndDate);
        const totalDuration = endTime - startTime;
        const completedPercentage = 100 - fast.PercentRemaining;
        const completedDuration = totalDuration * (completedPercentage / 100);
        const stopTime = new Date(startTime + completedDuration);
        return stopTime;
    }

function getProgressBarWidth(percentCompleted) {
    return `${percentCompleted}%`;
}

function getProgressBarColor(percentCompleted) {
    if (percentCompleted < 33) return '#FFA07A'; // Light Salmon
    if (percentCompleted < 66) return '#98FB98'; // Pale Green
    return '#87CEFA'; // Light Sky Blue
}

function formatDate(timestamp) {
        return new Date(Number(timestamp)).toLocaleString();
    }

function formatDuration(milliseconds) {
        const hours = Math.floor(milliseconds / (1000 * 60 * 60));
        const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
    }
function getStatusColor(success) {
        return success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    }
</script>

<style>
    .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
    }

    .title {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 20px;
        color: #333;
    }

    .fast-list {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .fast-card {
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        transition: box-shadow 0.3s ease, transform 0.3s ease;
        cursor: pointer;
        position: relative;
    }

    .fast-card:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        transform: translateY(-5px);
    }

    .progress-bar {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        transition: width 0.5s ease-out;
        opacity: 0.2;
    }

    .fast-content {
        position: relative;
        z-index: 1;
    }

    .fast-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        background-color: rgba(248, 248, 248, 0.7);
        border-bottom: 1px solid #eaeaea;
    }

    .fast-duration {
        font-weight: bold;
        font-size: 1.1rem;
        color: #333;
    }

    .status-badge {
        padding: 5px 10px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: bold;
    }

    .status-success {
        background-color: #e6f7e6;
        color: #2e7d32;
    }

    .status-incomplete {
        background-color: #ffeaea;
        color: #c62828;
    }

    .fast-details {
        padding: 15px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }

    .fast-details p {
        margin: 5px 0;
        font-size: 0.9rem;
        color: #555;
    }

    .fast-details strong {
        color: #333;
    }
</style>

<div class="container">
    <h2 class="title">Fast Records</h2>
    {#if $loading}
        <Loading />
    {:else if $fasts.length === 0}
        <p>No fasts recorded yet.</p>
    {:else}
        <div class="fast-list">
            {#each $fasts as fast}
                <div class="fast-card" on:click={() => handleFastClick(fast)}>
                    <div class="progress-bar" 
                         style="width: {getProgressBarWidth(100 - fast.PercentRemaining)}; 
                                background-color: {getProgressBarColor(100 - fast.PercentRemaining)};"></div>
                    <div class="fast-content">
                        <div class="fast-header">
                            <span class="fast-duration">{fast.TotalDuration}h Fast</span>
                            <span class={`status-badge ${fast.Success ? 'status-success' : 'status-incomplete'}`}>
                                {fast.Success ? 'Success' : 'Incomplete'}
                            </span>
                        </div>
                        <div class="fast-details">
                            <p><strong>Start:</strong> {formatDate(fast.StartDate)}</p>
                            <p><strong>End:</strong> {formatDate(fast.EndDate)}</p>
                            <p><strong>Stopped:</strong> {formatDate(calculateStopTime(fast))}</p>
                            <p><strong>Actual Duration:</strong> {formatDuration(calculateStopTime(fast) - Number(fast.StartDate))}</p>
                            <p><strong>Progress:</strong> {(100 - fast.PercentRemaining).toFixed(1)}%</p>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>




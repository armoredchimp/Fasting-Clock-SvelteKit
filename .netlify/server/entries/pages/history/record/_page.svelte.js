import { c as create_ssr_component, s as subscribe, v as validate_component, k as each, e as escape, l as null_to_empty, m as set_store_value } from "../../../../chunks/ssr.js";
import { t as totalTime, c as currPerc, l as loading, d as dataFetched, f as fasts } from "../../../../chunks/stores2.js";
import { u as user } from "../../../../chunks/userStore.js";
import axios from "axios";
import { L as Loading, a as aws_stages } from "../../../../chunks/Loading.js";
const css = {
  code: ".container.svelte-m60byf.svelte-m60byf{max-width:800px;margin:0 auto;padding:20px}.title.svelte-m60byf.svelte-m60byf{font-size:2rem;font-weight:bold;margin-bottom:20px}.fast-list.svelte-m60byf.svelte-m60byf{display:flex;flex-direction:column;gap:20px}.fast-card.svelte-m60byf.svelte-m60byf{background-color:var(--modal-color);border-radius:8px;box-shadow:0 2px 4px rgba(0, 0, 0, 0.1);overflow:hidden;transition:box-shadow 0.3s ease, transform 0.3s ease;cursor:pointer;position:relative}.fast-card.svelte-m60byf.svelte-m60byf:hover{box-shadow:0 4px 8px rgba(0, 0, 0, 0.15);transform:translateY(-5px)}.progress-bar.svelte-m60byf.svelte-m60byf{position:absolute;top:0;left:0;height:100%;transition:width 0.5s ease-out;opacity:0.2}.fast-content.svelte-m60byf.svelte-m60byf{position:relative;z-index:1}.fast-header.svelte-m60byf.svelte-m60byf{display:flex;justify-content:space-between;align-items:center;padding:15px;background-color:rgba(248, 248, 248, 0.7);border-bottom:1px solid #eaeaea}.fast-duration.svelte-m60byf.svelte-m60byf{font-weight:bold;font-size:1.1rem;color:#333}.status-badge.svelte-m60byf.svelte-m60byf{padding:5px 10px;border-radius:20px;font-size:0.8rem;font-weight:bold}.status-success.svelte-m60byf.svelte-m60byf{background-color:#e6f7e6;color:#2e7d32}.status-incomplete.svelte-m60byf.svelte-m60byf{background-color:#ffeaea;color:#c62828}.fast-details.svelte-m60byf.svelte-m60byf{padding:15px;display:grid;grid-template-columns:repeat(2, 1fr);gap:10px}.fast-details.svelte-m60byf p.svelte-m60byf{margin:5px 0;font-size:0.9rem;color:#333}.fast-details.svelte-m60byf strong.svelte-m60byf{color:#333}",
  map: `{"version":3,"file":"Record.svelte","sources":["Record.svelte"],"sourcesContent":["<script>\\r\\nimport { dataFetched, fasts, loading, currPerc, totalTime } from \\"./stores\\";\\r\\nimport { user } from \\"./auth/userStore\\";\\r\\nimport axios from \\"axios\\";\\r\\nimport { aws_stages } from \\"../aws/stages\\";\\r\\nimport { onMount } from \\"svelte\\";\\r\\nimport { Loading } from \\"carbon-components-svelte\\";\\r\\n\\r\\nonMount(async () => {\\r\\n        if ($user?.username && !$dataFetched) {\\r\\n            await fetchFasts();\\r\\n        }\\r\\n    });\\r\\n   \\r\\n$: if ($user !== null && !$dataFetched){\\r\\n    fetchFasts()\\r\\n}\\r\\n\\r\\n$: sortedFasts = [...$fasts].reverse();\\r\\n\\r\\nasync function fetchFasts() {\\r\\n        if ($dataFetched || $fasts.length > 0){\\r\\n            return\\r\\n        }\\r\\n\\r\\n        try {\\r\\n            $loading = true;\\r\\n            const username = $user?.username\\r\\n            console.log($user)\\r\\n            console.log('Fetching fasts for username:', username);\\r\\n            // @ts-ignore\\r\\n            const url = aws_stages.API_GET_ALL_URL.replace(\\"{username}\\", username);\\r\\n            const response = await axios.get(url);\\r\\n            $fasts = response.data;\\r\\n            $dataFetched = true;\\r\\n            console.log('Fetched fasts:', fasts);\\r\\n            $loading = false;\\r\\n            \\r\\n        } catch (err) {\\r\\n            console.error('Error fetching fasts: ', err)\\r\\n            $loading = false;\\r\\n        }\\r\\n    }\\r\\n   \\r\\n\\r\\nfunction handleFastClick(fast){\\r\\n    console.log('clicked!', fast)\\r\\n}    \\r\\n\\r\\nfunction calculateStopTime(fast) {\\r\\n        const startTime = Number(fast.StartDate);\\r\\n        const endTime = Number(fast.EndDate);\\r\\n        const totalDuration = endTime - startTime;\\r\\n        const completedPercentage = 100 - fast.PercentRemaining;\\r\\n        const completedDuration = totalDuration * (completedPercentage / 100);\\r\\n        const stopTime = new Date(startTime + completedDuration);\\r\\n        return stopTime;\\r\\n    }\\r\\n\\r\\nfunction getProgressBarWidth(percentCompleted) {\\r\\n    return \`\${percentCompleted}%\`;\\r\\n}\\r\\n\\r\\nfunction getProgressBarColor(percentCompleted) {\\r\\n    if (percentCompleted < 33) return 'var(--secondary-color)'; \\r\\n    if (percentCompleted < 66) return 'var(--lighter-color)'; \\r\\n    return 'var(--rare-color)'; \\r\\n}\\r\\n\\r\\n\\r\\nfunction formatDate(timestamp) {\\r\\n        return new Date(Number(timestamp)).toLocaleString();\\r\\n    }\\r\\n\\r\\nfunction formatDuration(milliseconds) {\\r\\n        const hours = Math.floor(milliseconds / (1000 * 60 * 60));\\r\\n        const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));\\r\\n        return \`\${hours}h \${minutes}m\`;\\r\\n    }\\r\\nfunction getStatusColor(success) {\\r\\n        return success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';\\r\\n    }\\r\\n\\r\\nfunction progressOrStopped(fast){\\r\\n    if(!fast.InProgress){\\r\\n        return formatDate(calculateStopTime(fast))\\r\\n    } else {\\r\\n        return 'In Progress'\\r\\n    }\\r\\n}\\r\\n\\r\\nfunction showPercent(fast) {\\r\\n    if (fast.Succeeded){\\r\\n        return \`100.0 %\`\\r\\n    }\\r\\n    if (fast.InProgress) {\\r\\n        return \`\${(100 - $currPerc).toFixed(1)}%\`;\\r\\n    } else {\\r\\n        return \`\${(100 - fast.PercentRemaining).toFixed(1)}%\`;\\r\\n    }\\r\\n\\r\\n}\\r\\nfunction returnPercent(fast) {\\r\\n    if (fast.Succeeded){\\r\\n        return 100\\r\\n    }\\r\\n    if (fast.InProgress) {\\r\\n        return (100 - $currPerc).toFixed(1);\\r\\n    } else {\\r\\n        return (100 - fast.PercentRemaining).toFixed(1);\\r\\n    }\\r\\n}\\r\\n\\r\\nfunction showActualTime(fast){\\r\\n    if(!fast.InProgress){\\r\\n        return formatDuration(fast.ActualDuration)\\r\\n    } else {\\r\\n    }\\r\\n        return formatDuration($totalTime)\\r\\n}\\r\\n     \\r\\n\\r\\n<\/script>\\r\\n\\r\\n<style>\\r\\n    .container {\\r\\n        max-width: 800px;\\r\\n        margin: 0 auto;\\r\\n        padding: 20px;\\r\\n    }\\r\\n\\r\\n    .title {\\r\\n        font-size: 2rem;\\r\\n        font-weight: bold;\\r\\n        margin-bottom: 20px;\\r\\n        /* color: #333; */\\r\\n    }\\r\\n\\r\\n    .fast-list {\\r\\n        display: flex;\\r\\n        flex-direction: column;\\r\\n        gap: 20px;\\r\\n    }\\r\\n\\r\\n    .fast-card {\\r\\n        background-color: var(--modal-color);\\r\\n        border-radius: 8px;\\r\\n        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\\r\\n        overflow: hidden;\\r\\n        transition: box-shadow 0.3s ease, transform 0.3s ease;\\r\\n        cursor: pointer;\\r\\n        position: relative;\\r\\n    }\\r\\n\\r\\n    .fast-card:hover {\\r\\n        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);\\r\\n        transform: translateY(-5px);\\r\\n    }\\r\\n\\r\\n    .progress-bar {\\r\\n        position: absolute;\\r\\n        top: 0;\\r\\n        left: 0;\\r\\n        height: 100%;\\r\\n        transition: width 0.5s ease-out;\\r\\n        opacity: 0.2;\\r\\n    }\\r\\n\\r\\n    .fast-content {\\r\\n        position: relative;\\r\\n        z-index: 1;\\r\\n    }\\r\\n\\r\\n    .fast-header {\\r\\n        display: flex;\\r\\n        justify-content: space-between;\\r\\n        align-items: center;\\r\\n        padding: 15px;\\r\\n        background-color: rgba(248, 248, 248, 0.7);\\r\\n        border-bottom: 1px solid #eaeaea;\\r\\n    }\\r\\n\\r\\n    .fast-duration {\\r\\n        font-weight: bold;\\r\\n        font-size: 1.1rem;\\r\\n        color: #333;\\r\\n    }\\r\\n\\r\\n    .status-badge {\\r\\n        padding: 5px 10px;\\r\\n        border-radius: 20px;\\r\\n        font-size: 0.8rem;\\r\\n        font-weight: bold;\\r\\n    }\\r\\n\\r\\n    .status-success {\\r\\n        background-color: #e6f7e6;\\r\\n        color: #2e7d32;\\r\\n    }\\r\\n\\r\\n    .status-incomplete {\\r\\n        background-color: #ffeaea;\\r\\n        color: #c62828;\\r\\n    }\\r\\n\\r\\n    .fast-details {\\r\\n        padding: 15px;\\r\\n        display: grid;\\r\\n        grid-template-columns: repeat(2, 1fr);\\r\\n        gap: 10px;\\r\\n    }\\r\\n\\r\\n    .fast-details p {\\r\\n        margin: 5px 0;\\r\\n        font-size: 0.9rem;\\r\\n        color: #333;\\r\\n    }\\r\\n\\r\\n    .fast-details strong {\\r\\n        color: #333;\\r\\n    }\\r\\n</style>\\r\\n\\r\\n{#if $user !== null}\\r\\n<div class=\\"container\\">\\r\\n    <h2 class=\\"title\\">Fast Records</h2>\\r\\n    {#if $loading}\\r\\n        <Loading />\\r\\n    {:else if $fasts.length === 0}\\r\\n        <p>No fasts recorded yet.</p>\\r\\n    {:else}\\r\\n        <div class=\\"fast-list\\">\\r\\n            {#each sortedFasts as fast}\\r\\n                <div class=\\"fast-card\\" on:click={() => handleFastClick(fast)}>\\r\\n                    <div class=\\"progress-bar\\" \\r\\n                    style=\\"width: {returnPercent(fast)}%; \\r\\n                    background-color: {getProgressBarColor(parseFloat(showPercent(fast)))};\\"></div>\\r\\n                    <div class=\\"fast-content\\">\\r\\n                        <div class=\\"fast-header\\">\\r\\n                            <span class=\\"fast-duration\\">{fast.ExpectedDuration}h Fast</span>\\r\\n                            <span class={\`status-badge \${fast.Succeeded ? 'status-success' : 'status-incomplete'}\`}>\\r\\n                                {fast.Succeeded ? 'Success' : 'Incomplete'}\\r\\n                            </span>\\r\\n                        </div>\\r\\n                        <div class=\\"fast-details\\">\\r\\n                            <p><strong>Start:</strong> {formatDate(fast.StartDate)}</p>\\r\\n                            <p><strong>End:</strong> {formatDate(fast.EndDate)}</p>\\r\\n                            <p><strong>Stopped:</strong> {progressOrStopped(fast)}</p>\\r\\n                            <p><strong>Actual Duration:</strong> {showActualTime(fast)}</p>\\r\\n                            <p><strong>Progress:</strong> {showPercent(fast)}</p>\\r\\n                        </div>\\r\\n                    </div>\\r\\n                </div>\\r\\n            {/each}\\r\\n        </div>\\r\\n    {/if}\\r\\n</div>\\r\\n{/if}\\r\\n"],"names":[],"mappings":"AA6HI,sCAAW,CACP,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,OAAO,CAAE,IACb,CAEA,kCAAO,CACH,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,CACjB,aAAa,CAAE,IAEnB,CAEA,sCAAW,CACP,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,GAAG,CAAE,IACT,CAEA,sCAAW,CACP,gBAAgB,CAAE,IAAI,aAAa,CAAC,CACpC,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACxC,QAAQ,CAAE,MAAM,CAChB,UAAU,CAAE,UAAU,CAAC,IAAI,CAAC,IAAI,CAAC,CAAC,SAAS,CAAC,IAAI,CAAC,IAAI,CACrD,MAAM,CAAE,OAAO,CACf,QAAQ,CAAE,QACd,CAEA,sCAAU,MAAO,CACb,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CACzC,SAAS,CAAE,WAAW,IAAI,CAC9B,CAEA,yCAAc,CACV,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,KAAK,CAAC,IAAI,CAAC,QAAQ,CAC/B,OAAO,CAAE,GACb,CAEA,yCAAc,CACV,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CACb,CAEA,wCAAa,CACT,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,CAC9B,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,IAAI,CACb,gBAAgB,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAC1C,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,OAC7B,CAEA,0CAAe,CACX,WAAW,CAAE,IAAI,CACjB,SAAS,CAAE,MAAM,CACjB,KAAK,CAAE,IACX,CAEA,yCAAc,CACV,OAAO,CAAE,GAAG,CAAC,IAAI,CACjB,aAAa,CAAE,IAAI,CACnB,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,IACjB,CAEA,2CAAgB,CACZ,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,OACX,CAEA,8CAAmB,CACf,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,OACX,CAEA,yCAAc,CACV,OAAO,CAAE,IAAI,CACb,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,OAAO,CAAC,CAAC,CAAC,GAAG,CAAC,CACrC,GAAG,CAAE,IACT,CAEA,2BAAa,CAAC,eAAE,CACZ,MAAM,CAAE,GAAG,CAAC,CAAC,CACb,SAAS,CAAE,MAAM,CACjB,KAAK,CAAE,IACX,CAEA,2BAAa,CAAC,oBAAO,CACjB,KAAK,CAAE,IACX"}`
};
function calculateStopTime(fast) {
  const startTime = Number(fast.StartDate);
  const endTime = Number(fast.EndDate);
  const totalDuration = endTime - startTime;
  const completedPercentage = 100 - fast.PercentRemaining;
  const completedDuration = totalDuration * (completedPercentage / 100);
  const stopTime = new Date(startTime + completedDuration);
  return stopTime;
}
function getProgressBarColor(percentCompleted) {
  if (percentCompleted < 33)
    return "var(--secondary-color)";
  if (percentCompleted < 66)
    return "var(--lighter-color)";
  return "var(--rare-color)";
}
function formatDate(timestamp) {
  return new Date(Number(timestamp)).toLocaleString();
}
function formatDuration(milliseconds) {
  const hours = Math.floor(milliseconds / (1e3 * 60 * 60));
  const minutes = Math.floor(milliseconds % (1e3 * 60 * 60) / (1e3 * 60));
  return `${hours}h ${minutes}m`;
}
function progressOrStopped(fast) {
  if (!fast.InProgress) {
    return formatDate(calculateStopTime(fast));
  } else {
    return "In Progress";
  }
}
const Record = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let sortedFasts;
  let $totalTime, $$unsubscribe_totalTime;
  let $currPerc, $$unsubscribe_currPerc;
  let $loading, $$unsubscribe_loading;
  let $dataFetched, $$unsubscribe_dataFetched;
  let $fasts, $$unsubscribe_fasts;
  let $user, $$unsubscribe_user;
  $$unsubscribe_totalTime = subscribe(totalTime, (value) => $totalTime = value);
  $$unsubscribe_currPerc = subscribe(currPerc, (value) => $currPerc = value);
  $$unsubscribe_loading = subscribe(loading, (value) => $loading = value);
  $$unsubscribe_dataFetched = subscribe(dataFetched, (value) => $dataFetched = value);
  $$unsubscribe_fasts = subscribe(fasts, (value) => $fasts = value);
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  async function fetchFasts() {
    if ($dataFetched || $fasts.length > 0) {
      return;
    }
    try {
      set_store_value(loading, $loading = true, $loading);
      const username = $user?.username;
      console.log($user);
      console.log("Fetching fasts for username:", username);
      const url = aws_stages.API_GET_ALL_URL.replace("{username}", username);
      const response = await axios.get(url);
      set_store_value(fasts, $fasts = response.data, $fasts);
      set_store_value(dataFetched, $dataFetched = true, $dataFetched);
      console.log("Fetched fasts:", fasts);
      set_store_value(loading, $loading = false, $loading);
    } catch (err) {
      console.error("Error fetching fasts: ", err);
      set_store_value(loading, $loading = false, $loading);
    }
  }
  function showPercent(fast) {
    if (fast.Succeeded) {
      return `100.0 %`;
    }
    if (fast.InProgress) {
      return `${(100 - $currPerc).toFixed(1)}%`;
    } else {
      return `${(100 - fast.PercentRemaining).toFixed(1)}%`;
    }
  }
  function returnPercent(fast) {
    if (fast.Succeeded) {
      return 100;
    }
    if (fast.InProgress) {
      return (100 - $currPerc).toFixed(1);
    } else {
      return (100 - fast.PercentRemaining).toFixed(1);
    }
  }
  function showActualTime(fast) {
    if (!fast.InProgress) {
      return formatDuration(fast.ActualDuration);
    }
    return formatDuration($totalTime);
  }
  $$result.css.add(css);
  {
    if ($user !== null && !$dataFetched) {
      fetchFasts();
    }
  }
  sortedFasts = [...$fasts].reverse();
  $$unsubscribe_totalTime();
  $$unsubscribe_currPerc();
  $$unsubscribe_loading();
  $$unsubscribe_dataFetched();
  $$unsubscribe_fasts();
  $$unsubscribe_user();
  return `${$user !== null ? `<div class="container svelte-m60byf"><h2 class="title svelte-m60byf" data-svelte-h="svelte-1wonjgn">Fast Records</h2> ${$loading ? `${validate_component(Loading, "Loading").$$render($$result, {}, {}, {})}` : `${$fasts.length === 0 ? `<p data-svelte-h="svelte-ybo3t4">No fasts recorded yet.</p>` : `<div class="fast-list svelte-m60byf">${each(sortedFasts, (fast) => {
    return `<div class="fast-card svelte-m60byf"><div class="progress-bar svelte-m60byf" style="${"width: " + escape(returnPercent(fast), true) + "%; background-color: " + escape(getProgressBarColor(parseFloat(showPercent(fast))), true) + ";"}"></div> <div class="fast-content svelte-m60byf"><div class="fast-header svelte-m60byf"><span class="fast-duration svelte-m60byf">${escape(fast.ExpectedDuration)}h Fast</span> <span class="${escape(null_to_empty(`status-badge ${fast.Succeeded ? "status-success" : "status-incomplete"}`), true) + " svelte-m60byf"}">${escape(fast.Succeeded ? "Success" : "Incomplete")} </span></div> <div class="fast-details svelte-m60byf"><p class="svelte-m60byf"><strong class="svelte-m60byf" data-svelte-h="svelte-1scx3na">Start:</strong> ${escape(formatDate(fast.StartDate))}</p> <p class="svelte-m60byf"><strong class="svelte-m60byf" data-svelte-h="svelte-5fohs9">End:</strong> ${escape(formatDate(fast.EndDate))}</p> <p class="svelte-m60byf"><strong class="svelte-m60byf" data-svelte-h="svelte-1dz17lh">Stopped:</strong> ${escape(progressOrStopped(fast))}</p> <p class="svelte-m60byf"><strong class="svelte-m60byf" data-svelte-h="svelte-1dpuuvs">Actual Duration:</strong> ${escape(showActualTime(fast))}</p> <p class="svelte-m60byf"><strong class="svelte-m60byf" data-svelte-h="svelte-1uk11xv">Progress:</strong> ${escape(showPercent(fast))}</p> </div></div> </div>`;
  })}</div>`}`}</div>` : ``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Record, "Record").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};

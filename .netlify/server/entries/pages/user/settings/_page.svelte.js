import { c as create_ssr_component } from "../../../../chunks/ssr.js";
import "../../../../chunks/stores2.js";
const css = {
  code: ".coming-soon.svelte-1aet8ga{display:flex;justify-content:center;align-items:center;height:100vh;font-size:2rem;text-align:center;font-weight:bold;color:#333}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\r\\n\\timport { currPage } from \\"$lib/stores\\";\\r\\n\\timport { onMount } from \\"svelte\\";\\r\\n\\r\\n    onMount(()=>{\\r\\n        currPage.set('/user/settings')\\r\\n    })\\r\\n<\/script>\\r\\n\\r\\n<style>\\r\\n    .coming-soon {\\r\\n        display: flex;\\r\\n        justify-content: center;\\r\\n        align-items: center;\\r\\n        height: 100vh;\\r\\n        font-size: 2rem;\\r\\n        text-align: center;\\r\\n        font-weight: bold;\\r\\n        color: #333;\\r\\n    }\\r\\n\\r\\n</style>\\r\\n\\r\\n<h1 class=\\"coming-soon\\">Settings page coming soon</h1>"],"names":[],"mappings":"AAUI,2BAAa,CACT,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,KAAK,CACb,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,MAAM,CAClB,WAAW,CAAE,IAAI,CACjB,KAAK,CAAE,IACX"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<h1 class="coming-soon svelte-1aet8ga" data-svelte-h="svelte-1jbehpq">Settings page coming soon</h1>`;
});
export {
  Page as default
};

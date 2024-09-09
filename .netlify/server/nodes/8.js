

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/user/settings/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/8.Cql60cMX.js","_app/immutable/chunks/scheduler.r8SUAE9F.js","_app/immutable/chunks/index.BpubQsAG.js","_app/immutable/chunks/stores.DuJS1qgO.js","_app/immutable/chunks/index.4Q6N0bkf.js"];
export const stylesheets = ["_app/immutable/assets/3.Bp2den5u.css"];
export const fonts = [];

import * as server from '../entries/pages/_page.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.B1YzLKpL.js","_app/immutable/chunks/scheduler.r8SUAE9F.js","_app/immutable/chunks/index.BpubQsAG.js","_app/immutable/chunks/stages.DjHEx8bp.js","_app/immutable/chunks/index.4Q6N0bkf.js","_app/immutable/chunks/stores.DuJS1qgO.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Loading.BrgIJGpN.js"];
export const stylesheets = ["_app/immutable/assets/2.D1uklUzq.css","_app/immutable/assets/Card.q0XW4Wim.css","_app/immutable/assets/Logout.B9UCNQ14.css"];
export const fonts = [];

import { r as readable, d as derived, w as writable } from "./index.js";
const hours = writable(12);
const currPerc = writable(50);
const startDate = writable(/* @__PURE__ */ new Date());
const futureDate = writable(/* @__PURE__ */ new Date());
const hasStarted = writable(false);
const succeeded = writable(false);
const exceeded = writable(false);
const loading = writable(false);
const currPage = writable("/");
const fasts = writable([]);
const dataFetched = writable(false);
const time = readable(/* @__PURE__ */ new Date(), function start(set) {
  const interval = setInterval(() => {
    set(/* @__PURE__ */ new Date());
  }, 1e3);
  return function stop() {
    clearInterval(interval);
  };
});
const totalTime = derived(
  [time, startDate],
  ([$time, $startDate]) => Math.max(0, $time - $startDate)
);
const futureDisplay = derived(
  [time, hours],
  ([$time, $hours]) => $time.getTime() + $hours * 60 * 60 * 1e3
);
const totalDuration = derived(hours, ($hours) => $hours * 60 * 60 * 1e3);
const remHours = derived(
  [time, futureDate],
  ([$time, $futureDate]) => Math.floor(($futureDate - $time) / 1e3 / 3600)
);
const remMins = derived(
  [time, futureDate],
  ([$time, $futureDate]) => Math.floor(($futureDate - $time) / 1e3 / 60)
);
const remSeconds = derived(
  [time, futureDate],
  ([$time, $futureDate]) => Math.round(($futureDate - $time) / 1e3)
);
export {
  hasStarted as a,
  futureDate as b,
  currPerc as c,
  dataFetched as d,
  startDate as e,
  fasts as f,
  currPage as g,
  hours as h,
  futureDisplay as i,
  totalDuration as j,
  remHours as k,
  loading as l,
  remMins as m,
  exceeded as n,
  remSeconds as r,
  succeeded as s,
  totalTime as t
};

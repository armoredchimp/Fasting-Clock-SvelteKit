import { writable, derived, readable } from 'svelte/store';

export const hours = writable(12);
export const currPerc = writable(50);
export const startDate = writable(new Date());
export const futureDate = writable(new Date());
export const hasStarted = writable(false);
export const succeeded = writable(false);
export const fastID = writable(0);

export const time = readable(new Date(), function start(set) {
	const interval = setInterval(() => {
		set(new Date());
	}, 1000);

	return function stop() {
		clearInterval(interval);
	};
});

export const futureDisplay = derived(
	[time, hours],
	([$time, $hours]) => $time.getTime() + $hours * 60 * 60 * 1000
);

export const totalDuration = derived(hours, ($hours) => $hours * 60 * 60 * 1000);

export const remHours = derived([time, futureDate], ([$time, $futureDate]) =>
	Math.floor(($futureDate - $time) / 1000 / 3600)
);
export const remMins = derived([time, futureDate], ([$time, $futureDate]) =>
	Math.floor(($futureDate - $time) / 1000 / 60)
);
export const remSeconds = derived([time, futureDate], ([$time, $futureDate]) =>
	Math.round(($futureDate - $time) / 1000)
);

// export const displayPerc = derived(currPerc, ($currPerc) => $currPerc * 4);

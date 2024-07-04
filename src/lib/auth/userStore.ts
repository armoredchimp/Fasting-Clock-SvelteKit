import { writable, derived } from 'svelte/store';
import { type AuthUser } from 'aws-amplify/auth';

interface RegStatus {
	completed: boolean;
	username: string;
}
interface UserState {
	user: AuthUser | null;
	regStatus: RegStatus | null;
}

const initialState: UserState = {
	user: null,
	regStatus: null
};

function createUserStore() {
	const { subscribe, set, update } = writable<UserState>(initialState);

	return {
		subscribe,
		setUser: (user: AuthUser | null) => update((state) => ({ ...state, user })),
		setRegStatus: (status: RegStatus | null) =>
			update((state) => ({ ...state, regStatus: status })),
		reset: () => set(initialState)
	};
}

// type UserStore = Writable<AuthUser | null>;

export const userStore = createUserStore();

export const user = derived(userStore, ($store) => $store.user);
export const registrationStatus = derived(userStore, ($store) => $store.regStatus);

export function isAuthUser(user: any): user is AuthUser {
	return user !== null && typeof user === 'object' && 'username' in user;
}

export function regStatusT(status: any): status is RegStatus {
	return (
		status !== null && typeof status == 'object' && 'isComplete' in status && 'username' in status
	);
}

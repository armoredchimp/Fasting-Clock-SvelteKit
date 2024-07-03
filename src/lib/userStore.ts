import { writable, type Writable } from 'svelte/store';
import { type AuthUser } from 'aws-amplify/auth';

type UserStore = Writable<AuthUser | null>;

export const user: UserStore = writable(null);

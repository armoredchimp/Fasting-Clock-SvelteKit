import { d as derived, w as writable } from "./index.js";
const initialState = {
  user: null,
  regStatus: null
};
function createUserStore() {
  const { subscribe, set, update } = writable(initialState);
  return {
    subscribe,
    setUser: (user2) => update((state) => ({ ...state, user: user2 })),
    setRegStatus: (status) => update((state) => ({ ...state, regStatus: status })),
    reset: () => set(initialState)
  };
}
const userStore = createUserStore();
const user = derived(userStore, ($store) => $store.user);
derived(userStore, ($store) => $store.regStatus);
export {
  userStore as a,
  user as u
};

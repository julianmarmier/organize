import { writable } from "svelte/store";
import { AppState } from "./definitions";

const createState = () => {
  const { subscribe, update } = writable<AppState>(AppState.INTRO);

  const stateTL = (state: AppState) => {
    switch (state) {
      case AppState.INTRO:
        return AppState.SELECT_FOLDERS;
      case AppState.SETTINGS:
        return AppState.MAIN;
      default:
        return AppState.MAIN;
    }
  }

    return {
        subscribe,
        nextState: (explicitState?: AppState) => (
            update(state => explicitState ?? stateTL(state))
        ),
    }
}

export const state = createState() 
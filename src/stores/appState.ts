import { writable } from "svelte/store";
import { AppState } from "./definitions";
import { setIntroFinished, setSelectFinished } from "./settings"

const createState = () => {
  const { subscribe, update } = writable<AppState>(AppState.OFF);

  const stateTL = (state: AppState) => {
    switch (state) {
      // No need for async handling as the worst case here is that
      // the user will have to redo the same thing again.
      case AppState.INTRO:
        setIntroFinished(true);
        return AppState.SELECT_FOLDERS;
      case AppState.SELECT_FOLDERS:
        setSelectFinished(true);
        return AppState.MAIN;
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
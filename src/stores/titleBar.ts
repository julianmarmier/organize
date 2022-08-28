import { basename, dirname } from "../util/path";
import { derived } from "svelte/store";
import { settingState } from "./settings";

type Title = {
  firstHalf: string;
  secondHalf: string;
  clickable: boolean;
};

export const titleBar = derived<typeof settingState, Title>(
  settingState,
  ($s, set) => {
    const hf = $s.homeFolder;
    if (hf && hf != "") {
     (async () => {
        const base = await basename(hf);
        const dir = await dirname(hf);

        set({
            firstHalf: dir + "/",
            secondHalf: base,
            clickable: true,
          })
      })()
    } else {
      set({
        firstHalf: "",
        secondHalf: "",
        clickable: false,
      });
    }
  }
);

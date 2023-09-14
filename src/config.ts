import type { BgConfig } from "./prefabs/Background";
import { BlinkConfig } from "./prefabs/Blink";
import { VaultElementConfig } from "./prefabs/VaultElement";

type Config = {
  backgrounds: Record<string, BgConfig>;
  vaultElements: Record<string, VaultElementConfig>;
  effects: Record<string, BlinkConfig>;
};

export default {
  backgrounds: {
    vault: {
      asset: "bg",
    },
  },
  vaultElements: {
    closedDoor: {
      asset: "door",
    },
    openedDoor: {
      asset: "doorOpen",
    },
    doorOpenShadow: {
      asset: "doorOpenShadow",
    },
    handle: {
      asset: "handle",
    },
    handleShadow: {
      asset: "handleShadow",
    },
  },
  effects: {
    blink: {
      asset: "blink",
    },
  },
} as Config;

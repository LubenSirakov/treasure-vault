import type { BgConfig } from "./prefabs/Background";
import { BlinkConfig } from "./prefabs/Blink";
import { VaultConfig } from "./prefabs/Vault";
import { HandleConfig } from "./prefabs/Handle";

type Config = {
  backgrounds: Record<string, BgConfig>;
  vault: Record<string, VaultConfig>;
  handles: Record<string, HandleConfig>;
  effects: Record<string, BlinkConfig>;
};

export default {
  backgrounds: {
    vault: {
      asset: "bg",
    },
  },
  vault: {
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
  handles: {
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

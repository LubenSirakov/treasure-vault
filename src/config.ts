import type { BgConfig } from "./prefabs/Background";
import { BlinkConfig } from "./prefabs/Blink";
import { DoorConfig } from "./prefabs/Door";
import { HandleConfig } from "./prefabs/Handle";

type Config = {
  backgrounds: Record<string, BgConfig>;
  doors: Record<string, DoorConfig>;
  handles: Record<string, HandleConfig>;
  effects: Record<string, BlinkConfig>;
};

export default {
  backgrounds: {
    vault: {
      asset: "bg",
    },
  },
  doors: {
    closedDoor: {
      asset: "door",
    },
    openedDoor: {
      asset: "doorOpen",
    },
    doorOpenShadow: {
      asset: "doorOpenShadow",
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

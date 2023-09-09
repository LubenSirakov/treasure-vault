import type { BgConfig } from "./prefabs/Background";
import { BlinkConfig } from "./prefabs/Blink";
import { DoorConfig } from "./prefabs/Door";
import { HandleConfig } from "./prefabs/Handle";

type Config = {
  backgrounds: Record<string, BgConfig>;
  doors: Record<string, DoorConfig>;
  handles: Record<string, HandleConfig>;
  blink: Record<string, BlinkConfig>;
};

export default {
  backgrounds: {
    vault: {
      layers: ["bg"],
      panSpeed: 0.2,
    },
  },
  doors: {
    closedDoor: {
      layers: ["door"],
      panSpeed: 0.2,
    },
    openedDoor: {
      layers: ["doorOpen"],
      panSpeed: 0.2,
    },
    doorOpenShadow: {
      layers: ["doorOpenShadow"],
      panSpeed: 0.2,
    },
  },
  handles: {
    handle: {
      layers: ["handle"],
      panSpeed: 0.2,
    },
    handleShadow: {
      layers: ["handleShadow"],
      panSpeed: 0.2,
    },
  },
  blink: {
    blink: {
      layers: ["blink"],
      panSpeed: 0.2,
    },
  },
} as Config;

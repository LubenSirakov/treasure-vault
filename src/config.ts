import type { BgConfig } from "./prefabs/Background";
import { DoorConfig } from "./prefabs/Door";
import { HandleConfig } from "./prefabs/Handle";

type Config = {
  backgrounds: Record<string, BgConfig>;
  doors: Record<string, DoorConfig>;
  handles: Record<string, HandleConfig>;
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
      layers: ["doorOpenShadow", "doorOpen"],
      panSpeed: 0.2,
    },
  },
  handles: {
    handle: {
      layers: ["handleShadow", "handle"],
      panSpeed: 0.2,
    },
  },
} as Config;

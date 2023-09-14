import { DisplayObject, Sprite, Text } from "pixi.js";
import gsap from "gsap";
import { Vault } from "../prefabs/Vault";
import Background from "../prefabs/Background";

export function centerObjects(...toCenter: DisplayObject[]) {
  const center = (obj: DisplayObject) => {
    obj.x = window.innerWidth / 2;
    obj.y = window.innerHeight / 2;

    if (obj instanceof Sprite) {
      obj.anchor.set(0.5);
    }
  };

  toCenter.forEach(center);
}

export function wait(seconds: number) {
  return new Promise<void>((res) => setTimeout(res, seconds * 1000));
}

export async function after(
  seconds: number,
  callback: (...args: unknown[]) => unknown
) {
  await wait(seconds);
  return callback();
}

export function getEntries<T extends object>(obj: T) {
  return Object.entries(obj) as Entries<T>;
}

export function animateOnResize(element: Vault | Background | Text) {
  gsap.to(element, {
    duration: 0.25,
    width: element.width,
    height: element.height,
    ease: "power2.out",
  });
}

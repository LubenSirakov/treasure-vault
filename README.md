## 🎮 Treasure Vault 🔒

### Embark on a thrilling adventure to uncover hidden treasure! ⏲️
But be ready, for the path to riches is guarded by a mysterious vault.

## Set up 🛠️

1. Clone repository `npx degit https://github.com/LubenSirakov/treasure-vault.git new-folder`

2. Navigate to the new directory and install the project dependencies using `npm install`

3. You can use the following commands to start the game on `localhost:3000` 💻

| Command           | Description                                                          |
| ----------------- | -------------------------------------------------------------------- |
| `npm run start`   | Run dev server                                                       |
| `npm run build`   | Build project for production                                         |
| `npm run preview` | Preview production build (must run `build` before running `preview`) |

### How to play?
When the game is loads a secret combination which unlocks the vault will be logged in the browser console.
The combination consists of three pairs, looking something like this: 
```
🔒 Vault Combination: 9 clockwise, 6 counterclockwise, 3 clockwise
```
To unlock the vault's secrets, you must master the art of combination-spinning! Simply tap the right or left side of your screen to spin the door handle in a clockwise or counterclockwise direction. Each tap brings you 60 degrees closer to your goal.

But beware! Mistakes are part of the game. If you make one, the timer resets, and a new combination awaits your skillful touch.

Once you crack the code and open the vault, don't dawdle! Grab as much treasure as you can within 5 seconds. The vault door won't stay open forever, and a fresh challenge awaits with a new combination to decipher!

## The game was made using
- Typescript
- PixiJS
- Howler
- GSAP
- <a href="https://c.tenor.com/Hw0aKasI6B4AAAAC/fast-blazing-fast.gif" target="_blank">Blazing fast</a> builds and HMR through Vite
- Scene management
- Automagic asset loading per scene (sounds, spritesheets, textures, spine)
- Keyboard input handling
- Spine!

export function generateVaultCombination(): string[] {
  const combination: string[] = [];

  for (let i = 0; i < 3; i++) {
    const number = Math.floor(Math.random() * 9) + 1;
    const direction = Math.random() < 0.5 ? "clockwise" : "counterclockwise";
    const pair = `${number} ${direction}`;
    combination.push(pair);
  }

  return combination;
}

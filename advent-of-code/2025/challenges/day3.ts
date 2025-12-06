import { sum } from "lodash";

interface Battery {
  joltage: number;
  position: number;
}

const parseInput = (input: string): number[][] => {
  return input
    .trim()
    .split("\n")
    .map((bank) => bank.split("").map((n) => Number.parseInt(n)));
};

const toNumber = (batteries: Battery[]): number => {
  return Number.parseInt(batteries.map((b) => b.joltage.toString()).join(""));
};

export const calculateMaximumJoltageOfBank = (
  bank: number[],
  noOfBatteries: number
): number => {
  const batteries: Battery[] = [];

  for (let skipFromEnd = noOfBatteries - 1; skipFromEnd >= 0; skipFromEnd--) {
    const lastBattery = batteries[batteries.length - 1] || {
      joltage: bank[0] as number,
      position: 0,
    };
    const startPos = batteries.length === 0 ? 0 : lastBattery?.position + 1;
    const tillPos = bank.length - skipFromEnd;

    let maxJoltageBatteryTillNow = {
      joltage: bank[startPos] as number,
      position: startPos,
    };

    for (let j = startPos; j < tillPos; j++) {
      const currentJoltage = bank[j] as number;
      if (currentJoltage > maxJoltageBatteryTillNow.joltage) {
        maxJoltageBatteryTillNow = { joltage: currentJoltage, position: j };
      }
    }

    batteries.push(maxJoltageBatteryTillNow);
  }

  return toNumber(batteries);
};

export const calculateMaximumJoltage = (
  input: string,
  noOfBatteries: number = 2
): number => {
  const batteryBanks = parseInput(input);
  const maxJoltages = batteryBanks.map((bb) =>
    calculateMaximumJoltageOfBank(bb, noOfBatteries)
  );
  return sum(maxJoltages);
};
